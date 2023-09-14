/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */
import { LegacyCard } from '@shopify/polaris';

import { DiscountReqCombine } from '../worker/api/discount/discount-req-combine';

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
      <LegacyCard>
        <LegacyCard.Section title="Title">
          <p>Title: {title}</p>
          <p>Description: {description}</p>
        </LegacyCard.Section>
        <LegacyCard.Section title="Value">
          <p>Discount Type: {discountType}</p>
          <p>
            Discount Value: {discountType === 'amount' ? '$' : ''}{' '}
            {discountValue}
            {discountType === 'percentage' ? '%' : ''}
          </p>
        </LegacyCard.Section>
        <LegacyCard.Section title="Minimum Requirements">
          <p>{minValue ? `Minimum value:${minValue}` : ''}</p>
          <p>{minQty ? `Minimum quantity:${minQty}` : ''}</p>
        </LegacyCard.Section>
        <LegacyCard.Section title="Max Usage">
          <p>Once per customer? </p>
          <p>{onePerUser ? 'Yes' : 'No'}</p>
        </LegacyCard.Section>
      </LegacyCard>
      <LegacyCard>
        <LegacyCard.Section title="Combines with">
          { discountType === "product" ?
          <p>
            Product Discounts: {combinesWith.productDiscounts ? 'Yes' : 'No'}
          </p>
          : ('')
          }
          <p>
            Shipping Discounts: {combinesWith.shippingDiscounts ? 'Yes' : 'No'}
          </p>
        </LegacyCard.Section>
        <LegacyCard.Section title="Active dates">
          <p>Starts at: {startsAt ? `${startsAt?.toLocaleString()}` : ''}</p>
          <p>Ends at: {endsAt ? `${endsAt?.toLocaleString()}` : ''}</p>
        </LegacyCard.Section>
      </LegacyCard>
    </>
  );
}
