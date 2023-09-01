/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { API, Throw } from '@mytiki/worker-utils-ts';
import { IRequest } from 'itty-router';
import { Shopify } from '../../shopify/shopify';

export async function ui(request: IRequest, env: Env): Promise<Response> {
  let redirectUrl: string;
  const reqHeaders = request.headers;
  const reqUrl = new URL(request.url);
  const dotIndex = reqUrl.pathname.indexOf('.');
  if (dotIndex >= 0) {
    const slashPos = reqUrl.pathname.lastIndexOf('/');
    const pathname = reqUrl.pathname.slice(slashPos);
    reqUrl.pathname = pathname;
    const newRequest = new Request(reqUrl.toString(), new Request(request));
    return env.ASSETS.fetch(newRequest);
  }
  const shop = request.query.shop as string;
  if (shop == null) {
    const headers = { ...reqHeaders, location: 'https://mytiki.com' };
    return new Response(null, {
      status: 302,
      headers,
    });
  }
  const shopify = new Shopify(shop, env);
  try {
    const accessToken = await shopify.getToken();
    const appInstallation = await shopify.getInstall(accessToken);
    const keys = appInstallation.data!.currentAppInstallation.metafields!.nodes;
    return env.ASSETS.fetch(request);
  } catch {
    reqUrl.pathname = `${API.Consts.API_LATEST}/oauth/authorize`;
    redirectUrl = reqUrl.href;
    const headers = { ...reqHeaders, location: redirectUrl };
    return new Response(null, {
      status: 302,
      headers,
    });
  }
}

export async function redact(): Promise<Response> {
  return new Response(null, {
    status: 200,
  });
}

export async function uninstall(
  request: IRequest,
  env: Env,
): Promise<Response> {
  const shop = request.headers.get('X-Shopify-Shop-Domain');
  Throw.ifNull(shop, 'X-Shopify-Shop-Domain');

  const shopify = new Shopify(shop as string, env);
  const success = await shopify.verifyWebhook(request);
  if (!success) {
    throw new API.ErrorBuilder().message('Invalid signature').error(403);
  }

  await shopify.removeToken();

  return new Response(null, {
    status: 200,
  });
}
