/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import React from 'react';
import { Checkbox } from "@shopify/polaris";
import { useCallback } from "react";
import { useState } from "react";

export const MaxUsageCheckbox = ({onChange = console.log}) => {
    const [oncePerCustomer, setOncePerCustomer] = useState<boolean>(false);
  
    const oncePerCustomerUpdate = useCallback(
        (value: boolean) => {
            console.log(value)
            setOncePerCustomer(value)
            onChange({oncePerCustomer: value})
        },
        [oncePerCustomer]
    )

    return (
      <Checkbox
            value='oncePerCustomer'
            checked={oncePerCustomer}
            onChange={oncePerCustomerUpdate} 
            label='Limit to one use per customer'
      />
    )};