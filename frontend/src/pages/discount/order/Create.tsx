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
import { DiscountReq } from '../../../interface/discount-req'
import {
    MinReqsCard,
    ActiveDatesCard,
    DiscountAmount,
    CombinationsCard,
    TitleAndDescription,
    MaxUsageCheckbox,
    DiscountSummary,
} from '../../../components'
import React from "react"
import { start } from "repl"

export function DiscountOrderCreate() {

    const app = useAppBridge();
    const redirect = Redirect.create(app);
    const authenticatedFetch = useAuthenticatedFetch();
   
    
    const [title, setTitle] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [startsAt, setStartsAt] = useState<Date>(new Date())
    const [endsAt, setEndsAt] = useState<Date>()
    const [discountType, setDiscountType] = useState<"amount" | "percentage">("amount")
    const [discountValue, setDiscountValue] = useState<number>(10)
    const [minValue, setMinValue] = useState<number>()
    const [minQty, setMinQty] = useState<number>()
    const [onePerUser, setOnePerUser] = useState<boolean>(true)
    const [combinesWith, setCombines] = useState({
        orderDiscounts: false,
        productDiscounts: false,
        shippingDiscounts: false
    })
    const handleChange = (event: any) => {
        if(event.title)setTitle(event.title)
        if(event.description) setDescription(event.description)
        if(event.type === "amount" || event.type === "percent")setDiscountType(event.type)
        if(event.value && !event.type) setDiscountValue(event.value)
        if(event.type === 'SUBTOTAL') {
            if(event.value) setMinValue(event.value)
            setMinQty(0)
        }
        if(event.type === 'QUANTITY') {
            if(event.qty) setMinQty(event.qty)
            setMinValue(0)
        }
        if(event.oncePerCustomer != undefined) setOnePerUser(event.oncePerCustomer)
        if(event.shippingDiscounts != undefined) setCombines({
            orderDiscounts: false,
            productDiscounts: false,
            shippingDiscounts: event.shippingDiscounts
        })
    }

    const submit = async () => {
        const body: DiscountReq = {
            "title": title!,
            "description": description!,
            "startsAt": startsAt!,
            "endsAt": endsAt!,
            "metafields": {
                "type": "order",
                "discountType": discountType!,
                "discountValue": discountValue!,
                "minValue": minValue!,
                "minQty": minQty!,
                "onePerUser": onePerUser!,
                "products": [],
                "collections": []
            },
            "combinesWith": {
                "orderDiscounts": false,
                "productDiscounts": false,
                "shippingDiscounts": combinesWith.shippingDiscounts
            }
        }
        let response = await authenticatedFetch("https://tiki.shopify.brgweb.com.br/api/latest/discount", {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify(body)
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
                            <TitleAndDescription onChange={handleChange}
                             />
                        </Card.Section>
                        <Card.Section title="Value">
                            <DiscountAmount
                                onChange={handleChange}
                            />
                        </Card.Section>
                        <Card.Section title="Usage limit" >
                        { <MaxUsageCheckbox onChange={handleChange} /> 
                        }
                       
                        </Card.Section>
                    </Card>
                    <MinReqsCard
                        appliesTo={AppliesTo.Order}
                        type={RequirementType.None}
                        subTotal={minValue}
                        qty={minQty}      
                        onChange={handleChange}
                    />

                    <CombinationsCard discountClassProp="ORDER" onChange={handleChange}
                    />
                     <ActiveDatesCard
                        onChange={(start: string, end: string) => {
                            setStartsAt(new Date(start))
                            if(end) setEndsAt(new Date(end)) 
                        }}
                        startsAt={(new Date()).toUTCString()}
                        endsAt={(new Date()).toUTCString()} /> 
            </Layout.Section>
                <Layout.Section secondary>
                    <DiscountSummary 
                        title={title!}
                        description={description!}
                        discountType={discountType!}
                        discountValue={discountValue!}
                        minValue={minValue!}
                        minQty={minQty!}
                        onePerUser={onePerUser!}
                        combinesWith={combinesWith}
                        startsAt={startsAt!}
                        endsAt={endsAt!}
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
