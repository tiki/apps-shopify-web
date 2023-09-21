/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { useState } from 'react';
import { useAppBridge } from '@shopify/app-bridge-react/useAppBridge';
import { Redirect } from '@shopify/app-bridge/actions';
import { AppliesTo, RequirementType } from '@shopify/discount-app-components';
import { LegacyCard, Layout, Page, PageActions, InlineError } from '@shopify/polaris';
import { useAuthenticatedFetch } from '../../../hooks/useAuthenticatedFetch';
import { DiscountReq } from '../../../worker/api/discount/discount-req';
import {
  MinReqsCard,
  ActiveDatesCard,
  DiscountAmount,
  CombinationsCard,
  TitleAndDescription,
  MaxUsageCheckbox,
  DiscountSummary,
  BannerImageDescription,
} from '../../../components';
import React from 'react';





export function DiscountOrderCreate() {
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  const authenticatedFetch = useAuthenticatedFetch();

  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [startsAt, setStartsAt] = useState<Date>(new Date());
  const [endsAt, setEndsAt] = useState<Date>();
  const [discountType, setDiscountType] = useState<'amount' | 'percentage'>(
    'amount',
  );
  const [discountValue, setDiscountValue] = useState<number>(10);
  const [minValue, setMinValue] = useState<number>();
  const [minQty, setMinQty] = useState<number>();
  const [onePerUser, setOnePerUser] = useState<boolean>(true);
  const [combinesWith, setCombines] = useState({
    orderDiscounts: false,
    productDiscounts: false,
    shippingDiscounts: false,
  });
  const [bannerFile, setBannerFile] = useState<File>();
  const [offerDescription, setOfferDescription] = useState('');
  const [submitError, setSubmitError] = useState<string>('');

  const handleChange = (event: any) => {
    setSubmitError('')
    if (event.title) setTitle(event.title);
    if (event.description) setDescription(event.description);
    if (event.type === 'amount' || event.type === 'percent')
      setDiscountType(event.type);
    if (event.value && !event.type) setDiscountValue(event.value);
    if (event.type === 'SUBTOTAL') {
      if (event.value) setMinValue(event.value);
      setMinQty(0);
    }
    if (event.type === 'QUANTITY') {
      if (event.qty) setMinQty(event.qty);
      setMinValue(0);
    }
    if (event.oncePerCustomer !== undefined)
      setOnePerUser(event.oncePerCustomer);
    if (event.shippingDiscounts !== undefined)
      setCombines({
        orderDiscounts: false,
        productDiscounts: false,
        shippingDiscounts: event.shippingDiscounts,
      });
      if(event.offerDescription){
        setOfferDescription(event.offerDescription)
      }
      if(event.bannerFile){
        setBannerFile(event.bannerFile[0])
        }
  };

  const handleBannerFile = async () => {  
    const extension = bannerFile?.name.lastIndexOf(".")
    const mimeType = bannerFile?.name.slice(extension! + 1)
    const imageId = await authenticatedFetch(`https://tiki-web.pages.dev/api/latest/upload/stage`, {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({name: bannerFile?.name!, mimeType: mimeType, size: bannerFile?.size}),
    })
    return await imageId.text()
  }

 
  const submit = async () => {
    const imageId = await handleBannerFile().catch(error=>{
      setSubmitError("Ops, something went wrong during the image upload, try another one.")
      console.log(error)
    })

    const body: DiscountReq = {
      title: title ?? '',
      startsAt: startsAt ?? '',
      endsAt,
      metafields: {
        type: 'order',
        discountType: discountType ?? '',
        discountValue: discountValue ?? '',
        description: description ?? '',
        minValue: minValue ?? 0.1,
        minQty: minQty ?? 0.1,
        onePerUser: onePerUser ?? '',
        products: [],
        collections: [],
      },
      combinesWith: {
        orderDiscounts: false,
        productDiscounts: false,
        shippingDiscounts: combinesWith.shippingDiscounts,
      },
      discountImg: imageId ?? '',
      discountDescription: offerDescription ?? ''
    };
    await authenticatedFetch(
      'https://tiki-web.pages.dev/api/latest/discount',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    ).then((response)=> {
      if(response.status >= 200 && response.status < 300){
         redirect.dispatch(Redirect.Action.ADMIN_SECTION, {
          name: Redirect.ResourceType.Discount,
        });
        return { status: 'success' };
      }
    }
    ).catch(error=>{
      setSubmitError("Ops, Something Went Wrong")
      console.log(error)
    });
  };

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
          <LegacyCard>
            <LegacyCard.Section title="Title">
              <TitleAndDescription onChange={handleChange} />
            </LegacyCard.Section>
            <LegacyCard.Section title="Value">
              <DiscountAmount onChange={handleChange} />
            </LegacyCard.Section>
            <LegacyCard.Section title="Usage limit">
              {<MaxUsageCheckbox onChange={handleChange} />}
            </LegacyCard.Section>
            <LegacyCard.Section title="Combinations">
              <CombinationsCard
                discountClassProp="ORDER"
                onChange={handleChange}
              />
            </LegacyCard.Section>
          </LegacyCard>
          <MinReqsCard
            appliesTo={AppliesTo.Order}
            type={RequirementType.None}
            subTotal={minValue}
            qty={minQty}
            onChange={handleChange}
          />
          <ActiveDatesCard
            onChange={(start: string, end: string) => {
              setStartsAt(new Date(start));
              if (end) setEndsAt(new Date(end));
            }}
            startsAt={new Date().toUTCString()}
            endsAt={new Date().toUTCString()}
          />
          <BannerImageDescription 
          onChange={handleChange}
          />
        </Layout.Section>
        <Layout.Section secondary>
          <DiscountSummary
            title={title ?? ''}
            description={description ?? ''}
            discountType={discountType ?? ''}
            discountValue={discountValue ?? ''}
            minValue={minValue ?? 0.1}
            minQty={minQty ?? 0.1}
            onePerUser={onePerUser ?? ''}
            combinesWith={combinesWith}
            startsAt={startsAt ?? ''}
            endsAt={endsAt}
            isProductDiscount={false}
          />
        </Layout.Section>
        <Layout.Section>
          <InlineError message={(submitError)} fieldID="errorField" />
          <PageActions
            primaryAction={{
              content: 'Save discount',
              onAction: submit,
            }}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
