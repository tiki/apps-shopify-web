/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import React from 'react';
import { CombinationCard, DiscountClass } from "@shopify/discount-app-components";
import { useCallback, useState } from "react";

export interface Combinations {
    orderDiscounts: boolean
    productDiscounts: boolean
    shippingDiscounts: boolean
}


export const CombinationsCard = ({onChange = console.log, discountClass = DiscountClass, discountClassProp = ''}) => {
    const [combinesWith, setCombinesWith] = useState({
      orderDiscounts: false,
      productDiscounts: false,
      shippingDiscounts: false,
    });

    const onChangeCallback = useCallback (
        (value: Combinations) => {
            onChange(value)
            setCombinesWith(value)
        },
        [combinesWith]
    )
  
    return (
      <CombinationCard
        combinableDiscountTypes={{
          value: combinesWith,
          onChange: onChangeCallback,
        }}
        discountClass={(discountClassProp === 'ORDER' ? discountClass.Order : discountClass.Product)}
        discountDescriptor=""
      />
    );
  }