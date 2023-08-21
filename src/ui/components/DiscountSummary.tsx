/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */
import { Card } from '@shopify/polaris';

import { DiscountReqCombine } from '../../api/discount/discount-req-combine';
import React from 'react';

interface DiscountSummaryProps {
  title: string;
  description: string;
  discountType: string;
  discountValue: number;
  minValue: number;
  minQty: number;
  onePerUser: boolean;
  combinesWith: DiscountReqCombine;
  startsAt: Date;
  endsAt: Date | undefined;
}

export function DiscountSummary({
  title,
  description,
  discountType,
  discountValue,
  minValue,
  minQty,
  onePerUser,
  combinesWith,
  startsAt,
  endsAt,
}: DiscountSummaryProps) {
  return (
    <>
      <Card>
        <Card.Section title="Title">
          <p>Title: {title}</p>
          <p>Description: {description}</p>
        </Card.Section>
        <Card.Section title="Value">
          <p>Discount Type: {discountType}</p>
          <p>
            Discount Value: {discountType === 'amount' ? '$' : ''}{' '}
            {discountValue}
            {discountType === 'percentage' ? '%' : ''}
          </p>
        </Card.Section>
        <Card.Section title="Minimum Requirements">
          <p>{minValue ? `Minimum value:${minValue}` : ''}</p>
          <p>{minQty ? `Minimum quantity:${minQty}` : ''}</p>
        </Card.Section>
        <Card.Section title="Max Usage">
          <p>Once per customer? </p>
          <p>{onePerUser ? 'Yes' : 'No'}</p>
        </Card.Section>
      </Card>
      <Card>
        <Card.Section title="Combines with">
          <p>Order Discounts: {combinesWith.orderDiscounts ? 'Yes' : 'No'}</p>
          <p>
            Product Discounts: {combinesWith.productDiscounts ? 'Yes' : 'No'}
          </p>
          <p>
            Shipping Discounts: {combinesWith.shippingDiscounts ? 'Yes' : 'No'}
          </p>
        </Card.Section>
        <Card.Section title="Active dates">
          <p>Starts at: {startsAt ? `${startsAt!.toLocaleString()}` : ''}</p>
          {endsAt ? `${endsAt!.toLocaleString()}` : ''}
        </Card.Section>
      </Card>
    </>
  );
}
