/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { IRequest } from 'itty-router';
import { Shopify } from '../../shopify/shopify';
import { OrderReq, toOrderReq } from './order-req';
import { Throw, API } from '@mytiki/worker-utils-ts';

export async function paid(request: IRequest, env: Env): Promise<Response> {

  const shop = request.headers.get('X-Shopify-Shop-Domain');

  Throw.ifNull(shop, 'X-Shopify-Shop-Domain');

  const shopify = new Shopify(shop as string, env);
  const success = await shopify.verifyWebhook(request);

  if (!success) {
    throw new API.ErrorBuilder().message('Invalid signature').error(403);
  }
  const order = toOrderReq(await request.json())
  await consumeDiscount(shopify, order);
  return new Response(null, {
    status: 200,
  });
}

async function consumeDiscount(shopify: Shopify, order: OrderReq) {
  if (
    order.discountApplications == null ||
    order.discountApplications.length === 0
    )
    return;
    const titles = order.discountApplications.map((discount) => discount.title);

   const ids = await shopify.getDiscountIds(titles);
  
   const userMetafields = await shopify.getCustomerMetafield(order.customer!.id, 'discount_allowed')

   const allowedList: Array<string> = JSON.parse(
     userMetafields.data.customer.metafield?.value ?? '[]',
   );

   const tids: Array<string> = [];
   ids.data.discountNodes.nodes.forEach((discount) => {
     if (discount.metafield?.id != null) {
       tids.push(discount.metafield.id);
     }
   });

  const allowedDiscounts: string[] = tids.filter(discount => allowedList.includes(discount));

  if(allowedDiscounts.length <= 0) return;

  await shopify.discountUsed(order.customer!.id, allowedDiscounts);

  return await fetch(`https://postman-echo.com/post`, {
    method: 'POST',
    body: JSON.stringify(order),
  })
    .then((response) => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error:', error))

}
