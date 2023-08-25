/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { useState } from 'react';
import { useAppBridge } from '@shopify/app-bridge-react/useAppBridge';
import { Redirect } from '@shopify/app-bridge/actions';
import { AppliesTo, RequirementType } from '@shopify/discount-app-components';
import { LegacyCard, Layout, Page, PageActions } from '@shopify/polaris';
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
import { useMutation } from 'react-query';
import { query, mutation } from 'gql-query-builder';




export async function DiscountOrderCreate() {
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
    if (event.shippingDiscounts !== undefined)
      setCombines({
        orderDiscounts: false,
        productDiscounts: false,
        shippingDiscounts: event.shippingDiscounts,
      });
      if(event.bannerDescription){
        setOfferDescription(event.offerDescription)
      }
      if(event.bannerFile){
        setBannerFile(event.bannerFile[0])
      }
  };

  // necessário transformar isso em query documents de fato
    const stagedUploadsQuery = `mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
      stagedUploadsCreate(input: $input) {
        stagedTargets {
          resourceUrl
          url
          parameters {
            name
            value
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;;

    // necessário transformar isso em query documents de fato
    const COLLECTION_UPDATE = `mutation collectionUpdate($input: CollectionInput!) {
      collectionUpdate(input: $input) {
        collection {
          id
          image {
            originalSrc
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const [collectionUpdate] = useMutation(COLLECTION_UPDATE);
  const [stagedUploadsCreate] = useMutation(stagedUploadsQuery);
  let { data } = await stagedUploadsCreate({ variables: {
    "input": [
      {
        "resource": "COLLECTION_IMAGE",
        "filename": bannerFile?.name,
        "mimeType": bannerFile!.type,
        "fileSize": bannerFile!.size.toString(),
        "httpMethod": "POST"
      }
    ]
  }})
  const [{ url, parameters }] = data.stagedUploadsCreate.stagedTargets

const formData = new FormData()

parameters.forEach(({name, value}) => {
  formData.append(name, value)
})

formData.append('file', bannerFile!)

const response = await fetch(url, {
  method: 'POST',
  body: formData
})
let imageForm: string
if (response.ok) {
  const key = parameters.find(p => p.name === 'key')
  imageForm = `${url}/${key.value}`
  await collectionUpdate({ variables: {
      "input": {
        "id": props.collectionId,
        "image": {
          "src": imageForm
        }
      }
    }
  })
}
//é necessário o collection Id.


//considerando que o fluxo acima está correto, após corrigir o mutation
// seria necessario apenas inserir o imageForm dentro do submit abaixo

 
  const submit = async () => {
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
    };
    await authenticatedFetch(
      'https://tiki.shopify.brgweb.com.br/api/latest/discount',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    );
    redirect.dispatch(Redirect.Action.ADMIN_SECTION, {
      name: Redirect.ResourceType.Discount,
    });
    return { status: 'success' };
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
          </LegacyCard>
          <MinReqsCard
            appliesTo={AppliesTo.Order}
            type={RequirementType.None}
            subTotal={minValue}
            qty={minQty}
            onChange={handleChange}
          />

          <CombinationsCard discountClassProp="ORDER" onChange={handleChange} />
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
