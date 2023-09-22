/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { API, Throw } from '@mytiki/worker-utils-ts';
import { IRequest } from 'itty-router';
import { Shopify } from '../../shopify/shopify';
import { mutation } from 'gql-query-builder';
import { ShopifyAuth } from '../../shopify/auth/shopify-auth';
import {
  FIleQueryResponse,
  StagedUploadResponse,
} from '../../../worker/shopify/shopify-mutations-types';

export async function ui(request: IRequest, env: Env): Promise<Response> {
  let redirectUrl: string;
  const reqHeaders = request.headers;
  const reqUrl = new URL(request.url);
  const dotIndex = reqUrl.pathname.indexOf('.');
  if (dotIndex >= 0) {
    const newRequestInit = {
      method: request.method,
      body: request.body,
      redirect: request.redirect,
      headers: request.headers,
      cf: { apps: false },
    };
    const slashPos = reqUrl.pathname.lastIndexOf('/');
    const pathname = reqUrl.pathname.slice(slashPos);
    reqUrl.pathname = pathname;
    const newRequest = new Request(
      reqUrl.toString(),
      new Request(request, newRequestInit),
    );
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
  // removekeys

  return new Response(null, {
    status: 200,
  });
}

export async function image(request: IRequest, env: Env) {
  try {

    type requestImage = {
      name: string;
      mimeType: string;
      size: number;
    };

    const body: requestImage = await request.json();

    let stagedUploadsQuery = mutation({
      operation: 'stagedUploadsCreate',
      variables: {
        input: { type: '[StagedUploadInput!]!', name: 'input' },
      },
      fields: [
        {
          userErrors: ['message', 'field'],
          stagedTargets: [
            'url',
            'resourceUrl',
            {
              parameters: ['name', 'value'],
            },
          ],
        },
      ],
    });

    const token = request.headers.get(API.Consts.AUTHORIZATION);

    const claims = await Shopify.verifySession(
      token!.replace('Bearer ', ''),
      env.KEY_ID,
      env.KEY_SECRET,
    );

    Throw.ifNull(claims.dest);
    const shopDomain = (claims.dest as string).replace(/^https?:\/\//, '');
    const shopify = new Shopify(shopDomain, env);
    const accessToken = await shopify
      .getToken()
      .catch((error) => console.log(error));
    stagedUploadsQuery.variables = {
      input: [
        {
          filename: body.name,
          httpMethod: 'POST',
          mimeType: `image/${body.mimeType}`,
          resource: 'FILE',
        },
      ],
    };

    const stagedUploadsQueryResult = await fetch(
      `https://${shopDomain}/admin/api/2023-07/graphql.json`,
      {
        method: 'POST',
        headers: new API.HeaderBuilder()
          .accept(API.Consts.APPLICATION_JSON)
          .content(API.Consts.APPLICATION_JSON)
          .set(ShopifyAuth.tokenHeader, accessToken!)
          .set('Authorization', token!)
          .build(),
        body: JSON.stringify(stagedUploadsQuery),
      },
    );
    
    const target: StagedUploadResponse = await stagedUploadsQueryResult.json();

    const params =
      target.data.stagedUploadsCreate.stagedTargets[0]['parameters'];
    const url = target.data.stagedUploadsCreate.stagedTargets[0]['url'];
    const resourceUrl =
      target.data.stagedUploadsCreate.stagedTargets[0]['resourceUrl'];

    const form = new FormData();
    params.forEach(({ name, value }) => {
      form.append(name, value);
    });
    form.append('file', body?.name);
    await fetch(url, {
      method: "POST",
      body: form,
      headers: {
        'Content-type': 'multipart/form-data',
        'Content-Length': String(body!.size),
      },
    });
    let createFileQuery = mutation({
      operation: 'fileCreate',
      variables: {
        files: { type: '[FileCreateInput!]!', name: 'files' },
      },
      fields: [
        {
          userErrors: ['message', 'field'],
          files: [
            'createdAt',
            'fileStatus',
            {
              operation: 'MediaImage',
              fields: ['id'],
              fragment: true,
            },
          ],
        },
      ],
    });
    createFileQuery.variables = {
      files: {
        alt: 'alt-tag',
        contentType: 'IMAGE',
        originalSource: resourceUrl,
      },
    };
    const createFileQueryResult = await fetch(
      `https://${shopDomain}/admin/api/2023-07/graphql.json`,
      {
        method: 'POST',
        body: JSON.stringify(createFileQuery),
        headers: new API.HeaderBuilder()
          .accept(API.Consts.APPLICATION_JSON)
          .content(API.Consts.APPLICATION_JSON)
          .set(ShopifyAuth.tokenHeader, accessToken!)
          .set('Authorization', token!)
          .build(),
      },
    );

    const result: FIleQueryResponse = await createFileQueryResult.json();
    const imageId = result.data.fileCreate.files[0]['id'];
    return new Response(imageId, {status: 200});
  } catch (error) {
    console.log(error);
  }
}
