/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import {
  Page,
  Layout,
  LegacyCard,
  TextField,
  Checkbox,
  VerticalStack,
  Select,
} from '@shopify/polaris';
import template from './terms';
import React, { useCallback, useState } from 'react';

export function OfferConfig() {
  const [allowDirectEdit, setAllowDirectEdit] = useState(false);
  const [terms, setTerms] = useState<string>(template);
  const [legalName, setLegalName] = useState('ACME INC');
  const [address, setAddress] = useState('ACME CITY, TT - US');
  const [tos, setTos] = useState('http://example.com');
  const [privacyPolicy, setPrivacyPolicy] = useState('http://example.com');
  const [selectedDiscount, setSelectedDiscount] = useState('discount1');
  const [useCases, setUseCases] = useState([
    '{ text: "Use Case 1", isUsed: true }',
    '{ text: "Use Case 2", isUsed: true }',
    '{ text: "Use Case 3", isUsed: false }',
  ]);
  const handleDiscountSelection = useCallback(
    (value: string) => {
      setSelectedDiscount(value);
    },
    [selectedDiscount],
  );
  const handleDirectEditPermission = useCallback(
    (value: boolean) => {
      setAllowDirectEdit(value);
    },
    [allowDirectEdit],
  );
  const handleTermsUpdate = useCallback(
    (value: string) => {
      setTerms(value);
    },
    [terms],
  );
  const handleLegalNameUpdate = useCallback(
    (value: string) => {
      setLegalName(value);
    },
    [legalName],
  );
  const handleAddressUpdate = useCallback(
    (value: string) => {
      setAddress(value);
    },
    [address],
  );
  const handleTosUpdate = useCallback(
    (value: string) => {
      setTos(value);
    },
    [tos],
  );
  const handlePrivacyPolicyUpdate = useCallback(
    (value: string) => {
      setPrivacyPolicy(value);
    },
    [privacyPolicy],
  );
  const handleUseCaseSelection = (value: string, index: number): void => {
    const newUseCases = [...useCases];
    newUseCases[index] = value;
    setUseCases(newUseCases);
  };
  const useCaseOptions = [
    { label: 'Use Case 1', value: '{ text: "Use Case 1", isUsed: true }' },
    { label: 'NOT Use Case 1', value: '{ text: "Use Case 1", isUsed: false }' },
    { label: 'Use Case 2', value: '{ text: "Use Case 2", isUsed: true }' },
    { label: 'NOT Use Case 2', value: '{ text: "Use Case 2", isUsed: false }' },
    { label: 'Use Case 3', value: '{ text: "Use Case 3", isUsed: true }' },
    { label: 'NOT Use Case 3', value: '{ text: "Use Case 3", isUsed: false }' },
    { label: 'Use Case 4', value: '{ text: "Use Case 4", isUsed: true }' },
    { label: 'NOT Use Case 4', value: '{ text: "Use Case 4", isUsed: false }' },
    { label: 'Use Case 5', value: '{ text: "Use Case 5", isUsed: true }' },
    { label: 'NOT Use Case 5', value: '{ text: "Use Case 5", isUsed: false }' },
    { label: 'Use Case 6', value: '{ text: "Use Case 6", isUsed: true }' },
    { label: 'NOT Use Case 6', value: '{ text: "Use Case 6", isUsed: false }' },
    { label: 'Use Case 7', value: '{ text: "Use Case 7", isUsed: true }' },
    { label: 'NOT Use Case 7', value: '{ text: "Use Case 7", isUsed: false }' },
    { label: 'Use Case 8', value: '{ text: "Use Case 8", isUsed: true }' },
    { label: 'NOT Use Case 8', value: '{ text: "Use Case 8", isUsed: false }' },
    { label: 'Use Case 9', value: '{ text: "Use Case 9", isUsed: true }' },
    { label: 'NOT Use Case 9', value: '{ text: "Use Case 9", isUsed: false }' },
    { label: 'Use Case 10', value: '{ text: "Use Case 10", isUsed: true }' },
    {
      label: 'NOT Use Case 10',
      value: '{ text: "Use Case 10", isUsed: false }',
    },
  ];
  const discountOptions = [
    { label: '10% off summer sale', value: 'discount1' },
    { label: '$10 coupon', value: 'discont2' },
    { label: '5% off', value: 'discount3' },
  ];

  const getTerms = () => {
    const newTerms = template;
    //   .replaceAll('%%%COMPANY%%%', legalName)
    //   .replaceAll('%%%ADDRESS%%%', address)
    //   .replaceAll('%%%TOS_URL%%%', tos)
    //   .replaceAll('%%%PRIVACY_POLICY_URL%%%', privacyPolicy)
    //   .replaceAll('%%%USE_CASES%%%', getUseCasesText())
    //   .replaceAll('%%%DISCOUNT%%%', getDiscountText());
    return newTerms;
  };

  const getUseCasesText = (): string => {
    return useCases
      .map((usecase) => {
        return usecase;
        const usecaseObj: { text: string; isUsed: boolean } =
          JSON.parse(usecase);
        return `${!usecaseObj.isUsed ? 'NOT ' : ''}${!usecaseObj.text}`;
      })
      .join(', ');
  };

  const getDiscountText = (): string => {
    return (
      discountOptions.find((discount) => discount.value === selectedDiscount)
        ?.label ?? ''
    );
  };

  const getUseCaseValue = (index: number): string => {
    return useCases[index];
  };

  return (
    <Page
      fullWidth
      title="TIKI Offer Configuration"
      primaryAction={{
        content: 'Save',
        onAction: () => console.log('save'),
      }}
    >
      <Layout>
        <Layout.Section>
          <LegacyCard title="Terms" sectioned>
            <LegacyCard.Section>
              <p>
                Placeholder text. In this section we explain about the terms and
                how to edit it.
                <br />
                The user must provide its legal information to fill the spaces
                in the terms text.
                <br />
                The text can be edited too, if the user wants to provide its own
                legal terms.
                <br />
              </p>
            </LegacyCard.Section>
            <LegacyCard.Section>
              <VerticalStack gap="5">
                <TextField
                  label="Company"
                  type="text"
                  value={legalName}
                  onChange={handleLegalNameUpdate}
                  helpText="This is the Comapany's legal name."
                  autoComplete="email"
                />
                <TextField
                  label="City, State and Country"
                  type="text"
                  value={address}
                  onChange={handleAddressUpdate}
                  helpText="This is the Company's legal Address City, State and Country."
                  autoComplete="email"
                />
                <TextField
                  label="Terms of service"
                  type="url"
                  value={tos}
                  onChange={handleTosUpdate}
                  helpText="The URL of your Terms of Service"
                  autoComplete=""
                />
                <TextField
                  label="Privacy Policy"
                  type="url"
                  value={privacyPolicy}
                  onChange={handlePrivacyPolicyUpdate}
                  helpText="The Privacy Policy URL"
                  autoComplete=""
                />
              </VerticalStack>
            </LegacyCard.Section>
            <LegacyCard.Section>
              {allowDirectEdit ? (
                <>
                  <p>
                    WARNING: THIS IS A LEGAL CONTRACT. EDIT WITH LEGAL ADVISORY.
                  </p>
                  <p>
                    Available placeholders. Will be replaced by the values
                    edited above.
                    <ul>
                      <li>Company: %%%COMPANY%%%</li>
                      <li>City, State and Country: %%%ADDRESS%%%</li>
                      <li>Terms of service: %%%TOS_URL%%%</li>
                      <li>Privacy Policy: %%%PRIVACY_POLICY_URL%%%</li>
                      <li>Privacy Policy: %%%USE_CASES%%%</li>
                      <li>Discount: %%%DISCOUNT%%%</li>
                    </ul>
                  </p>
                  <TextField
                    label="Terms editor"
                    value={template}
                    onBlur={(e) => handleTermsUpdate(e?.target.nodeValue ?? '')}
                    multiline={4}
                    autoComplete="off"
                  />
                </>
              ) : (
                ''
              )}
              <>
                <p>{getTerms()}</p>
                <Checkbox
                  label="I want to edit the terms. I understand the risk."
                  checked={allowDirectEdit}
                  onChange={handleDirectEditPermission}
                />
              </>
              )
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section secondary>
          <LegacyCard title="Discount" sectioned>
            <p>Choose which discount should be used in the offer.</p>
            <Select
              label="Discount"
              options={discountOptions}
              onChange={handleDiscountSelection}
              value={selectedDiscount}
            />
          </LegacyCard>
          <LegacyCard title="Use cases" sectioned>
            <p>
              Use cases describe how the user data will be used or not used.
            </p>
            <VerticalStack gap="5">
              <Select
                label="First use case"
                options={useCaseOptions}
                onChange={(value) => handleUseCaseSelection(value, 0)}
                value={getUseCaseValue(0)}
              />
              <Select
                label="Second use case"
                options={useCaseOptions}
                onChange={(value) => handleUseCaseSelection(value, 2)}
                value={getUseCaseValue(2)}
              />
              <Select
                label="Third use case"
                options={useCaseOptions}
                onChange={(value) => handleUseCaseSelection(value, 3)}
                value={getUseCaseValue(3)}
              />
            </VerticalStack>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
