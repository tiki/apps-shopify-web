/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { LegacyCard, Layout, Page } from '@shopify/polaris';
import { DiscountReq } from '../../../worker/api/discount/discount-req';
import { useAuthenticatedFetch } from '../../../hooks/useAuthenticatedFetch';
import React, {useState, useEffect} from 'react';


export function DiscountOrderDetail() {
  const authenticatedFetch = useAuthenticatedFetch();
  const url = new URL(window.location.href);
  console.log('url', url);
  const slashPos = url.pathname.lastIndexOf('/');
  const pathname = url.pathname.slice(slashPos + 1);
  const id = pathname;
  console.log('id:', id);

  let [discount, setDiscount] = useState<DiscountReq>()

  useEffect(() => {
    authenticatedFetch(
      `https://intg-shpfy.pages.dev/api/latest/discount/${id}`,
      { method: 'get' })
    .then(response => response.json())
    .then(data => setDiscount(data))
    .catch(error => console.log(error))
  },[])


 console.log(discount);

  return ( !discount ? <Page></Page> :
    <Page title="Order Discount">
      <Layout >
        <Layout.Section>
          <LegacyCard>
            <LegacyCard.Section title="Title">
              <p>Title: {discount.title ?? ''}</p>
              <p>Description: {discount.metafields.description ?? ''}</p>
            </LegacyCard.Section>
            <LegacyCard.Section title="Value">
              <p>Discount Type: {discount.metafields.discountType ?? ''}</p>
              <p>
                Discount Value:{' '}
                {discount.metafields.discountType === 'amount' ? '$' : ''}{' '}
                {discount.metafields.discountValue ?? ''}
                {discount.metafields.discountType === 'percentage' ? '%' : ''}
              </p>
            </LegacyCard.Section>
            <LegacyCard.Section title="Minimum Requirements">
              <p>
                {discount.metafields.minValue
                  ? `Minimum value:${discount.metafields.minValue ?? ''}`
                  : ''}
              </p>
              <p>
                {discount.metafields.minQty
                  ? `Minimum quantity:${discount.metafields.minQty ?? ''}`
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
              <p>Starts at: {new Date(discount.startsAt).toLocaleTimeString() ?? ''}</p>
              <p>
                {discount.endsAt
                  ? `Ends at: ${new Date(discount.endsAt).toLocaleDateString() ?? ''}`
                  : ''}
              </p>
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
