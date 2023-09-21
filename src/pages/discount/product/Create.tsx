/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { useAppBridge } from '@shopify/app-bridge-react/useAppBridge';
import { AppliesTo, RequirementType } from '@shopify/discount-app-components';
import { LegacyCard, Layout, Page, PageActions } from '@shopify/polaris';
import { DiscountReq } from '../../../worker/api/discount/discount-req';
import {
  MinReqsCard,
  ActiveDatesCard,
  DiscountAmount,
  CombinationsCard,
  AppliesToChoices,
  TitleAndDescription,
  DiscountSummary,
  MaxUsageCheckbox,
  BannerImageDescription
} from '../../../components';
import { useState } from 'react';
import { Redirect } from '@shopify/app-bridge/actions';
import { useAuthenticatedFetch } from '../../../hooks/useAuthenticatedFetch';
import { Resource } from '@shopify/app-bridge/actions/ResourcePicker';
import React from 'react';

export function DiscountProductCreate() {
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  const authenticatedFetch = useAuthenticatedFetch();
  const [fields, setFields] = useState<DiscountReq>({
    title: '',
    startsAt: new Date(),
    endsAt: undefined,
    metafields: {
      description: '',
      type: 'product',
      discountType: 'amount',
      discountValue: 10,
      minValue: 0,
      minQty: 0,
      onePerUser: true,
      products: [],
      collections: [],
    },
    combinesWith: {
      orderDiscounts: false,
      productDiscounts: false,
      shippingDiscounts: false,
    },
    discountImg: '',
    discountDescription: ''
  });
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
  const handleChange = (event: any) => {
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
    if (
      event.shippingDiscounts !== undefined 
    )
      setCombines((prevProps)=>({
        ...prevProps,
        shippingDiscounts: event.shippingDiscounts,
      }));
    if (event.productDiscounts !== undefined)
      setCombines((prevProps)=>({
        ...prevProps,
        productDiscounts: event.productDiscounts,
      }));
      if(event.offerDescription){
        setOfferDescription(event.offerDescription)
      }
      if(event.bannerFile){
        console.log(typeof event.bannerFile, event.bannerFile[0])
        setBannerFile(event.bannerFile[0])
        }
  };

  const handleBannerFile = async () => {  
    const extension = bannerFile?.name.lastIndexOf(".")
    const mimeType = bannerFile?.name.slice(extension! + 1)
    console.log(extension, mimeType)
    const imageId = await authenticatedFetch(`https://tiki-web.pages.dev/api/latest/upload/stage`, {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({name: bannerFile?.name!, mimeType: mimeType, size: bannerFile?.size}),
    })
    return await imageId.text()
  }


  const submit = async () => {
    const imageId = await handleBannerFile()

    const body: DiscountReq = {
      title: title ?? '',
      startsAt: startsAt ?? '',
      endsAt,
      metafields: {
        type: 'product',
        description: description ?? '',
        discountType: discountType ?? '',
        discountValue: discountValue ?? '',
        minValue: minValue ?? 0.1,
        minQty: minQty ?? 0.1,
        onePerUser: onePerUser ?? '',
        products: fields.metafields.products,
        collections: fields.metafields.collections,
      },
      combinesWith: {
        orderDiscounts: false,
        productDiscounts: false,
        shippingDiscounts: combinesWith.shippingDiscounts,
      },
      discountImg: imageId,
      discountDescription: offerDescription
    };
    console.log('body:', body)
    await authenticatedFetch('https://tiki-web.pages.dev/api/latest/discount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    redirect.dispatch(Redirect.Action.ADMIN_SECTION, {
      name: Redirect.ResourceType.Discount,
    });
    return { status: 'success' };
  };

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
            <LegacyCard>
              <LegacyCard.Section title="Title">
                <TitleAndDescription onChange={handleChange} />
              </LegacyCard.Section>
              <LegacyCard.Section title="Value">
                <DiscountAmount onChange={handleChange} />
              </LegacyCard.Section>
               <LegacyCard.Section title="Applies To">
                <AppliesToChoices
                  onChange={(
                    list: Resource[],
                    resource: 'all' | 'products' | 'collections',
                  ) => {
                    switch (resource) {
                      case 'all':
                        fields.metafields.products = [];
                        fields.metafields.collections = [];
                        break;
                      case 'products':
                        fields.metafields.products = list.map((p) => p.id);
                        fields.metafields.collections = [];
                        break;
                      case 'collections':
                        fields.metafields.collections = list.map((p) => p.id);
                        fields.metafields.products = [];
                        break;
                    }
                    setFields(fields);
                  }}
                />
              </LegacyCard.Section>
              <LegacyCard.Section title="Usage limit">
              {<MaxUsageCheckbox onChange={handleChange} />}
            </LegacyCard.Section>
              <LegacyCard.Section title="Combinations">
                <CombinationsCard
                discountClassProp="PRODUCT"
                onChange={handleChange}
              />
              </LegacyCard.Section>
            </LegacyCard>
            <MinReqsCard
              appliesTo={AppliesTo.Products}
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
          </form>
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
            combinesWith={combinesWith ?? ''}
            startsAt={startsAt}
            endsAt={endsAt}
            isProductDiscount={true}
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
  );
}
