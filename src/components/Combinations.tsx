/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { useCallback, useState } from 'react';
import {
  CombinationCard,
  DiscountClass,
} from '@shopify/discount-app-components';
import { Checkbox } from '@shopify/polaris';


export interface Combinations {
  orderDiscounts: boolean;
  productDiscounts: boolean;
  shippingDiscounts: boolean;
}

export const CombinationsCard = ({
  onChange = console.log,
  discountClass = DiscountClass,
  discountClassProp = '',
}) => {
  const [combinesWith, setCombinesWith] = useState({
    orderDiscounts: false,
    productDiscounts: false,
    shippingDiscounts: false,
  });

  const onChangeCallback = useCallback(
    (value: Combinations) => {
      console.log('teste', value)
      onChange(value);
      setCombinesWith(value);
    },
    [combinesWith],
  );
  if(discountClassProp === "ORDER") return (
    <Checkbox
    value="Shipping Discount"
    onChange={onChangeCallback}
    label="Limit to one use per customer"
  />
  )
  //return (
    // <CombinationCard
    //   combinableDiscountTypes={{
    //     value: combinesWith,
    //     onChange: onChangeCallback,
    //   }}
    //   discountClass={
    //     discountClassProp === 'ORDER'
    //       ? discountClass.Order
    //       : discountClass.Product
    //   }
    //   discountDescriptor=""
    // />
    
 // );
};
