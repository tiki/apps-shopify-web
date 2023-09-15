/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { LegacyCard, Layout, Page } from '@shopify/polaris';
import { DiscountReq } from '../../../worker/api/discount/discount-req';

export function DiscountOrderDetail() {
  const discount: DiscountReq = {
    title: 'Test Title',
    startsAt: new Date('2023-06-20T10:54:12.959Z'),
    endsAt: new Date('2024-06-20T10:54:12.959Z'),
    metafields: {
      description: 'test description',

      type: 'order',
      discountType: 'amount',
      discountValue: 10,
      minValue: 100,
      minQty: 0,
      onePerUser: false,
      products: [],
      collections: [],
    },
    combinesWith: {
      orderDiscounts: false,
      productDiscounts: false,
      shippingDiscounts: false,
    },
  };

  return (
    <Page title="Order Discount">
      <Layout>
        <Layout.Section>
          <LegacyCard>
            <LegacyCard.Section title="Title">
              <p>Title AAAAAAAAAA: {discount.title}</p>
              <p>Description: {discount.metafields.description}</p>
            </LegacyCard.Section>
            <LegacyCard.Section title="Value">
              <p>Discount Type: {discount.metafields.discountType}</p>
              <p>
                Discount Value:{' '}
                {discount.metafields.discountType === 'amount' ? '$' : ''}{' '}
                {discount.metafields.discountValue}
                {discount.metafields.discountType === 'percentage' ? '%' : ''}
              </p>
            </LegacyCard.Section>
            <LegacyCard.Section title="Minimum Requirements">
              <p>
                {discount.metafields.minValue
                  ? `Minimum value:${discount.metafields.minValue}`
                  : ''}
              </p>
              <p>
                {discount.metafields.minQty
                  ? `Minimum quantity:${discount.metafields.minQty}`
                  : ''}
              </p>
            </LegacyCard.Section>
            <LegacyCard.Section title="Max Usage">
              <p>Once per customer? </p>
              <p>{discount.metafields.onePerUser ? 'Yes' : 'No'}</p>
            </LegacyCard.Section>
          </LegacyCard>
          <LegacyCard>
            <LegacyCard.Section title="Combines with">
              <p>
                Order Discounts:{' '}
                {discount.combinesWith.orderDiscounts ? 'Yes' : 'No'}
              </p>
              <p>
                Product Discounts:{' '}
                {discount.combinesWith.productDiscounts ? 'Yes' : 'No'}
              </p>
              <p>
                Shipping Discounts:{' '}
                {discount.combinesWith.shippingDiscounts ? 'Yes' : 'No'}
              </p>
            </LegacyCard.Section>
            <LegacyCard.Section title="Active dates">
              <p>Starts at: {discount.startsAt.toLocaleTimeString()}</p>
              <p>
                {discount.endsAt
                  ? `Ends at: ${discount.endsAt.toLocaleDateString()}`
                  : ''}
              </p>
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
