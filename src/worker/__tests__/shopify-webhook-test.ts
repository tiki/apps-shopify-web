/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import * as Verify from './__fixtures__/verify';
import { Shopify } from '../shopify/shopify';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const env = getMiniflareBindings() as Env;

describe('Shopify Webhook tests', function () {
  test('Test order_paid webhook endpoint', async () => {
    const shopify = new Shopify('dummy', env);
    const signature = await Verify.signedHeader();
    const request = new Request('https://shopify-test.mytiki.com', {
      method: 'POST',
      body: Verify.webhook,
      headers: new Headers({
        'X-Shopify-Hmac-SHA256': signature,
      }),
    });
    const success = await shopify.verifyWebhook(request);
    expect(success);

  });
});