/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { IRequest } from 'itty-router';
import { Shopify } from '../../shopify/shopify';
import { OrderReq } from './order-req';
import { Throw, API } from '@mytiki/worker-utils-ts';
import { Tiki } from '../../tiki/tiki';

export async function paid(request: IRequest, env: Env): Promise<Response> {
  const shop = request.headers.get('X-Shopify-Shop-Domain');
  Throw.ifNull(shop, 'X-Shopify-Shop-Domain');
  const shopify = new Shopify(shop as string, env);
  const success = await shopify.verifyWebhook(request);
  if (!success) {
    throw new API.ErrorBuilder().message('Invalid signature').error(403);
  }

  
  const order: OrderReq = await request.json();
  
  await consumeDiscount(shopify, order, env);

  return new Response(null, {
    status: 200,
  });
}

async function consumeDiscount(shopify: Shopify, order: OrderReq, env: Env) {
  if (
    order.discount_applications == null ||
    order.discount_applications.length === 0
  )
    return;

  const titles = order.discount_applications.map((discount) => discount.title);

  const ids = await shopify.getDiscountIds(titles);

  const cur = await shopify.getCustomerMetafield(order.customer.id, "discount_allowed");

  const allowedList: Array<string> = JSON.parse(
    cur.data.customer.metafield?.value ?? '[]',
  );

  const tids: Array<string> = [];

  ids.data.discountNodes.nodes.forEach((discount) => {
    if (discount.metafield?.key === 'tid') {
      tids.push(discount.metafield.value!);
    }
  });


  const allowedDiscounts = tids.filter(value => allowedList.includes(value));

  await shopify.discountUsed(order.customer.id, allowedDiscounts);

  const tiki = new Tiki(env)
  const shopifyToken = await shopify.getToken()
  const appInstallation = await shopify.getInstall(shopifyToken);
  const keys = appInstallation.data?.currentAppInstallation.metafields?.nodes;
  const publicKey = keys?.find((obj)=> obj.key === "public_key_id")
  const token = await tiki.admin('storage', publicKey?.value!)

  await fetch('https://ingest.mytiki.com/api/latest/shopify-order', {
    method: "POST",
    headers:{
      "Authorization": 'Bearer ' + token
    },
    body: JSON.stringify(order)
  }).catch(error => console.log(error))
}
