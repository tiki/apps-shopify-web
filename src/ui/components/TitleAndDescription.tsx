/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import React, { useState } from 'react';
import { TextField } from '@shopify/polaris';

export function TitleAndDescription({ onChange = console.log }) {
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  return (
    <>
      <TextField
        helpText="A short title for the discount. Will be shown to the customer"
        label="Discount Title"
        autoComplete=""
        value={title}
        onChange={(value) => {
          setTitle(value);
          onChange({
            title: value,
            description,
          });
        }}
      />
      <TextField
        label="Description"
        helpText="Internal description of the discount. Will NOT be shown to the customer"
        autoComplete=""
        value={description}
        onChange={(value) => {
          setDesc(value);
          onChange({
            title,
            description: value,
          });
        }}
      />
    </>
  );
}
