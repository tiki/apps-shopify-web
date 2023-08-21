/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import React, { useCallback, useState } from 'react';
import { ButtonGroup, Button } from '@shopify/polaris';

export function DiscountAmountBtns({ onChange = console.log }) {
  const [activeButtonType, setActiveButtonType] = useState('amount');

  const handleButtonClick = useCallback(
    (type: string) => {
      setActiveButtonType(type);
      onChange(type);
    },
    [activeButtonType],
  );

  return (
    <ButtonGroup segmented>
      <Button
        pressed={activeButtonType === 'amount'}
        onClick={() => {
          handleButtonClick('amount');
        }}
      >
        Fixed $
      </Button>
      <Button
        pressed={activeButtonType === 'percent'}
        onClick={() => {
          handleButtonClick('percent');
        }}
      >
        Percent %
      </Button>
    </ButtonGroup>
  );
}
