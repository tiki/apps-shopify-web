/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import React from 'react';
import App from './App';

import { createRoot } from 'react-dom/client';
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('app')!;
const root = createRoot(container);
root.render(<App />);
