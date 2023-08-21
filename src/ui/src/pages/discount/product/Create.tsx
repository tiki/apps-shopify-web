/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */


import { useAppBridge } from '@shopify/app-bridge-react/useAppBridge'

import { AppliesTo, RequirementType } from '@shopify/discount-app-components'
import { Card, Layout, Page, PageActions } from '@shopify/polaris'

import { DiscountReq } from '../../../../../api/discount/discount-req'

import {
    MinReqsCard,
    ActiveDatesCard,
    DiscountAmount,
    CombinationsCard,
    AppliesToChoices,
    TitleAndDescription,
    DiscountSummary
} from '../../../../components'
import { useState } from "react"
import { Redirect } from '@shopify/app-bridge/actions'
import { useAuthenticatedFetch } from '../../../hooks/useAuthenticatedFetch'
import { Resource } from '@shopify/app-bridge/actions/ResourcePicker'
import React from 'react'

export function DiscountProductCreate() {

    const app = useAppBridge();
    const redirect = Redirect.create(app);
    const authenticatedFetch = useAuthenticatedFetch();

    const [fields, setFields] = useState<DiscountReq>({
        "title": "",
        "startsAt": new Date(),
        "endsAt": undefined,
        "metafields": {
            "description": "",

            "type": "product",
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
        let response = await authenticatedFetch("https://tiki.shopify.brgweb.com.br/api/latest/discount", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fields)
        });
        const data = (await response.json());
        console.log(JSON.stringify(data));
        redirect.dispatch(Redirect.Action.ADMIN_SECTION, {
            name: Redirect.ResourceType.Discount,
        });
        return { status: "success" };
    }

    return (
        <Page
            title="Create a Product Discount"
            primaryAction={{
                content: 'Save',
                onAction: submit,
            }}
        >
            <Layout>
                <Layout.Section>
                    <form>
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
                            <Card.Section title="Applies To">
                                <AppliesToChoices onChange={(list: Resource[], resource: 'all' | 'products' | 'collections') => {
                                    switch (resource) {
                                        case 'all':
                                            fields.metafields.products = []
                                            fields.metafields.collections = []
                                            break
                                        case 'products':
                                            fields.metafields.products = list.map((p) => p.id)
                                            fields.metafields.collections = []
                                            break
                                        case 'collections':
                                            fields.metafields.collections = list.map((p) => p.id)
                                            fields.metafields.products = []
                                            break
                                    }
                                    setFields(fields)
                                }}
                                />
                            </Card.Section>
                        </Card>
                        <MinReqsCard
                            appliesTo={AppliesTo.Products}
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
                    </form>
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

