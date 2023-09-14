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
  const [checkedShippingOrder, setCheckedShippingOrder] = useState(false);
  const [checkedShippingProduct, setCheckedShippingProduct] = useState(false);
  const [checkedProduct, setCheckedProduct] = useState(false);

  const [combinesWith, setCombinesWith] = useState({
    orderDiscounts: false,
    productDiscounts: false,
    shippingDiscounts: false,
  });

  const onChangeCallback = useCallback(
    (value: boolean, id: string) => {
      console.log('teste', value, id);
      onChange(value);
      if (id === 'shipping_order') {
        setCombinesWith((prevProps) => ({
          ...prevProps,
          shippingDiscounts: value,
        }));
        onChange({ shippingDiscounts: value });
        setCheckedShippingOrder(value);
      }
      if (id === 'shipping_product') {
        setCombinesWith((prevProps) => ({
          ...prevProps,
          shippingDiscounts: value,
        }));
        onChange({ shippingDiscounts: value });
        setCheckedShippingProduct(value);
      }
      if (id === 'product') {
        setCombinesWith((prevProps) => ({
          ...prevProps,
          productDiscounts: value,
        }));
        onChange({ productDiscounts: value });
        setCheckedProduct(value);
      }
    },
    [combinesWith],
  );
  return discountClassProp === 'ORDER' ? (
    <>
      <Checkbox
        value="Shipping Discount"
        onChange={onChangeCallback}
        label="Shipping Discount"
        id="shipping_order"
        checked={checkedShippingOrder}
      />
    </>
  ) : (
    <>
      <Checkbox
        value="Shipping Discount"
        onChange={onChangeCallback}
        label="Shipping Discount"
        id="shipping_product"
        checked={checkedShippingProduct}
      />
      <Checkbox
        value="Product Discount"
        onChange={onChangeCallback}
        label="Product Discounts"
        id="product"
        checked={checkedProduct}
      />
    </>
  );

  // if(discountClassProp === "ORDER") return (
  //   <>
  //       <Checkbox
  //       value="Shipping Discount"
  //       onChange={onChangeCallback}
  //       label="Shipping Discount"
  //       id='shipping_order'
  //     />
  //   </>
  // )
  // else return (
  //   <>
  //       <Checkbox
  //       value="Shipping Discount"
  //       onChange={onChangeCallback}
  //       label="Shipping Discount"
  //       id='shipping_product'
  //     />
  //      <Checkbox
  //       value="Product Discount"
  //       onChange={onChangeCallback}
  //       label="Product Discounts"
  //       id='product'
  //     />
  //   </>
  // )
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
