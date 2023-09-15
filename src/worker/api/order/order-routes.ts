/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { IRequest } from 'itty-router';
import { Shopify } from '../../shopify/shopify';
import { OrderReq } from './order-req';
import { Throw, API } from '@mytiki/worker-utils-ts';

export async function paid(request: IRequest, env: Env): Promise<Response> {
  const shop = request.headers.get('X-Shopify-Shop-Domain');
  console.log('teste', shop)
  Throw.ifNull(shop, 'X-Shopify-Shop-Domain');
  const shopify = new Shopify(shop as string, env);
  // const success = await shopify.verifyWebhook(request);
  // if (!success) {
  //   throw new API.ErrorBuilder().message('Invalid signature').error(403);
  // }

  
  const order: OrderReq = await request.json();
  console.log(order);
  
  await consumeDiscount(shopify, order);

  return new Response(null, {
    status: 200,
  });
}

async function consumeDiscount(shopify: Shopify, order: OrderReq) {
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
    if (discount.metafield?.id != null) {
      tids.push(discount.metafield.id);
    }
  });

  const allowedDiscounts = tids.filter(value => allowedList.includes(value));


  await shopify.discountUsed(order.customer.id, allowedDiscounts);
}
