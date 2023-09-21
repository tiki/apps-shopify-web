/* global TikiSdk,TIKI_SETTINGS,ShopifyAnalytics,_st,Shopify, window */

import {DropZone, LegacyStack, Thumbnail, Text, TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import React from 'react';

export const BannerImageDescription = ({ onChange = console.log }) => {
  const [bannerFile, setBannerFile] = useState<File>();
  const [offerDescription, setOfferDescription] = useState('');
  
  const handleDropZoneDrop = useCallback(
    (_dropFiles: File[], bannerFile: File[], _rejectedFiles: File[]) =>
    setBannerFile(bannerFile[0]),
    [],
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  const fileUpload = !bannerFile && <DropZone.FileUpload />;
  const uploadedFile = bannerFile && (
    <LegacyStack>
      <div>
        {bannerFile.name}{' '}
        <Text variant="bodySm" as="p">
          {bannerFile.size} bytes
        </Text>
      </div>
    </LegacyStack>
  );

  return (
    <>
        <DropZone allowMultiple={false} onDrop={
          handleDropZoneDrop
        }
        onDropAccepted={(file)=>{
          onChange({bannerFile: file})
        }}
        label="Banner Discount Image"
        >
        {uploadedFile}
        {fileUpload}
        </DropZone> 

        <TextField
            helpText="A short description for the discount. Will be shown to the customer"
            label="Discount Description"
            autoComplete=""
            value={offerDescription}
            onChange={(value: string) => {
                onChange({offerDescription: value})
                setOfferDescription(value);
            }}
        />
      </>
  );
}

