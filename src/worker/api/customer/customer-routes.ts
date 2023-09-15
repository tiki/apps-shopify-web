/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { IRequest } from 'itty-router';
import { Shopify } from '../../shopify/shopify';
import { CustomerDiscount } from './customer-discount';
import { API, Throw } from '@mytiki/worker-utils-ts';
import { Tiki } from '../../tiki/tiki';

export async function dataRequest(): Promise<Response> {
  return new Response(null, {
    status: 200,
  });
}

export async function redact(): Promise<Response> {
  return new Response(null, {
    status: 200,
  });
}

export async function discount(request: IRequest, env: Env): Promise<Response> {
  let previous = new Date().getTime();
  const token = request.headers.get(API.Consts.AUTHORIZATION) as string;
  console.log('token', new Date().getTime() - previous);
  previous = new Date().getTime();
  const address = request.headers.get('X-Tiki-Address') as string;
  console.log('address', new Date().getTime() - previous);
  previous = new Date().getTime();
  const signature = request.headers.get('X-Tiki-Signature') as string;
  console.log('signature', new Date().getTime() - previous);
  previous = new Date().getTime();

  Throw.ifNull(token, 'Authorization');
  Throw.ifNull(address, 'X-Tiki-Address');
  Throw.ifNull(signature, 'X-Tiki-Signature');

  const tiki = new Tiki(env);
  console.log('tiki', new Date().getTime() - previous);
  previous = new Date().getTime();
  const claims = await tiki.verifyEcdsa(token.replace('Bearer ', ''));
  console.log('claims', new Date().getTime() - previous);
  previous = new Date().getTime();
  const appId = claims.get('sub') as string;
  console.log('appId', new Date().getTime() - previous);
  previous = new Date().getTime();
  const body = await request.text();
  console.log('body', new Date().getTime() - previous);
  previous = new Date().getTime();
  const json: CustomerDiscount = JSON.parse(body);
  console.log('json', new Date().getTime() - previous);
  previous = new Date().getTime();
  const adminToken = await tiki.admin();
  console.log('adminToken', new Date().getTime() - previous);
  previous = new Date().getTime();
  const registry = await tiki.registry(adminToken, address, appId);
  console.log('registry', new Date().getTime() - previous);
  previous = new Date().getTime();
  if (Number(registry.id) !== Number(json.customerId)) {
    throw new API.ErrorBuilder().message('Invalid X-Tiki-Address').error(403);
  }

  const shopify = new Shopify(json.shop, env);
  await shopify.setDiscountAllowed(json.customerId, json.discountId);
  return new Response(null, {
    status: 201,
  });
}
