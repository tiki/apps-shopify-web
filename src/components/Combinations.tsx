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
    (value: boolean, id:string) => {
      console.log('teste', value, id)
      onChange(value);
      // setCombinesWith({
      //   [id]: value
      // });
    },
    [combinesWith],
  );
  if(discountClassProp === "ORDER") return (
    <>
        <Checkbox
        value="Shipping Discount"
        onChange={onChangeCallback}
        label="Shipping Discount"
        id='shipping'
      />
    </>
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
