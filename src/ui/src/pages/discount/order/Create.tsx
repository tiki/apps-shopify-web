/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { useState } from "react"

import { useAppBridge } from '@shopify/app-bridge-react/useAppBridge'
import { Redirect } from '@shopify/app-bridge/actions'
import { AppliesTo, RequirementType } from '@shopify/discount-app-components'

import { Card, Layout, Page, PageActions } from '@shopify/polaris'
import { useAuthenticatedFetch } from '../../../hooks/useAuthenticatedFetch'

import { DiscountReq } from '../../../../../api/discount/discount-req'
import {
    MinReqsCard,
    ActiveDatesCard,
    DiscountAmount,
    CombinationsCard,
    TitleAndDescription,
    MaxUsageCheckbox,
    DiscountSummary,
} from '../../../../components'
import React from "react"

export function DiscountOrderCreate() {

    const app = useAppBridge();
    const redirect = Redirect.create(app);
    const authenticatedFetch = useAuthenticatedFetch();
    const [fields, setFields] = useState<DiscountReq>({
        "title": "",
        "startsAt": new Date(),
        "endsAt": undefined,
        "metafields": {
            "description": "",

            "type": "order",
            "discountType": "amount",
            "discountValue": 10,
            "minValue": 0,
            "minQty": 0,
            "onePerUser": true,
            "products": [],
            "collections": []
        },
        "combinesWith": {
            "orderDiscounts": false,
            "productDiscounts": false,
            "shippingDiscounts": false
        }
    })

    const submit = async () => {
        const body = JSON.stringify(fields);
        let response = await authenticatedFetch("https://tiki.shopify.brgweb.com.br/api/latest/discount", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body
        });
        const data = (await response.json());
        redirect.dispatch(Redirect.Action.ADMIN_SECTION, {
            name: Redirect.ResourceType.Discount,
        });
        return { status: "success" };
    }

    return (
        <Page
            title="Create an Order Discount"
            primaryAction={{
                content: 'Save',
                onAction: submit,
            }}
        >
            <Layout>
                <Layout.Section>
                    <Card>
                        <Card.Section title="Title">
                            <TitleAndDescription onChange={(values) => {
                                fields.title = values.title
                                fields.metafields.description = values.description
                                setFields(fields)
                            }} />
                        </Card.Section>
                        <Card.Section title="Value">
                            <DiscountAmount
                                onChange={({ type, value }) => {
                                    if (type !== undefined) {
                                        fields.metafields.discountType = type
                                    }
                                    if (value !== undefined) {
                                        fields.metafields.discountValue = value
                                    }
                                    setFields(fields)
                                }}
                            />
                        </Card.Section>
                        <Card.Section title="Usage limit">
                            <MaxUsageCheckbox onChange={({ oncePerCustomer }) => {
                                fields.metafields.onePerUser = oncePerCustomer === true
                                setFields(fields)
                            }} />
                        </Card.Section>
                    </Card>
                    <MinReqsCard
                        appliesTo={AppliesTo.Order}
                        type={RequirementType.None}
                        subTotal={fields.metafields.minValue}
                        qty={fields.metafields.minQty}
                        onChange={({ type, value, qty }) => {
                            switch (type) {
                                case RequirementType.Quantity:
                                    fields.metafields.minQty = qty
                                    fields.metafields.minValue = 0
                                    break;
                                case RequirementType.Subtotal:
                                    fields.metafields.minValue = value
                                    fields.metafields.minQty = 0
                                    break;
                                case RequirementType.None:
                                    fields.metafields.minValue = 0
                                    fields.metafields.minQty = 0
                                    break;
                            }
                            setFields(fields)
                        }}
                    />

                    <CombinationsCard onChange={(combinations) => {
                        fields.combinesWith.orderDiscounts = combinations.orderDiscounts
                        fields.combinesWith.productDiscounts = combinations.productDiscounts
                        fields.combinesWith.shippingDiscounts = combinations.shippingDiscounts
                        setFields(fields)
                    }} />
                    <ActiveDatesCard
                        onChange={(s: string, e: string) => {
                            fields.startsAt = new Date(s)
                            fields.endsAt = e ? new Date(e) : undefined
                            setFields(fields)
                        }}
                        startsAt={fields.startsAt.toUTCString()}
                        endsAt={fields.endsAt ? fields.endsAt.toUTCString() : ''} />
                </Layout.Section>
                <Layout.Section secondary>
                    <DiscountSummary
                        title={fields.title}
                        description={fields.metafields.description}
                        discountType={fields.metafields.discountType}
                        discountValue={fields.metafields.discountValue}
                        minValue={fields.metafields.minValue}
                        minQty={fields.metafields.minQty}
                        onePerUser={fields.metafields.onePerUser}
                        combinesWith={fields.combinesWith}
                        startsAt={fields.startsAt}
                        endsAt={fields.endsAt}
                    />
                </Layout.Section>
                <Layout.Section>
                    <PageActions
                        primaryAction={{
                            content: 'Save discount',
                            onAction: submit,
                        }}
                    />
                </Layout.Section>
            </Layout>
        </Page>
    )
}
