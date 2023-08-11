/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */
import React, { useState } from 'react';
import { SummaryCard, DiscountMethod } from "@shopify/discount-app-components";
import { Card } from '@shopify/polaris';
import { DiscountReq } from '../interface/discount-req';
import { DiscountReqCombine } from '../interface/discount-req-combine';

interface DiscountSummaryProps {
    title: string,
    description: string,
    discountType: string,
    discountValue: number,
    minValue: number,
    minQty: number,
    onePerUser: boolean,
    combinesWith: DiscountReqCombine,
    startsAt: Date,
    endsAt: Date | undefined
}

export function DiscountSummary( {
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
} : DiscountSummaryProps ) {
    console.log(title);
    console.log("rebuild");
    const [fields, setFields] = useState({
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
    })
    return <> 
        <Card>
            <Card.Section title="Title">
                <p>Title: {fields.title}</p>
                <p>Description: {fields.description}</p>
            </Card.Section>
            <Card.Section title="Value">
                <p>Discount Type: {fields.discountType}</p>
                <p>Discount Value: {fields.discountType === 'amount' ? '$' : ''} {fields.discountValue}{fields.discountType === 'percentage' ? '%' : ''}</p>
            </Card.Section>
            <Card.Section title="Minimum Requirements">
                <p>{fields.minValue ? `Minimum value:${fields.minValue}` : ''}</p>
                <p>{fields.minQty ? `Minimum quantity:${fields.minQty}` : ''}</p>
            </Card.Section>
            <Card.Section title="Max Usage">
                <p>Once per customer? </p>
                <p>{fields.onePerUser ? 'Yes' : 'No'}</p>
            </Card.Section>
        </Card>
        <Card>
                <Card.Section title="Combines with">
                    <p>Order Discounts: {fields.combinesWith.orderDiscounts ? 'Yes' : 'No'}</p>
                    <p>Product Discounts: {fields.combinesWith.productDiscounts ? 'Yes' : 'No'}</p>
                    <p>Shipping Discounts: {fields.combinesWith.shippingDiscounts ? 'Yes' : 'No'}</p>
                </Card.Section>
                <Card.Section title="Active dates">
                    <p>Starts at: {fields.startsAt.toLocaleTimeString()}</p>
                    {fields.endsAt ? `<p>Ends at: ${fields.endsAt!.toLocaleDateString()}</p>` : ''}
                </Card.Section>
        </Card>
    </>
}