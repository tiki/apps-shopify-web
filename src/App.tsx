/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
  DiscountProvider,
} from './components/providers';
import { NavigationMenu } from '@shopify/app-bridge-react';
import { AppRouter } from './components/AppRouter';

export default function App() {
  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
        <NavigationMenu
            navigationLinks={[
              {
                label: 'Home',
                destination: '/',
              },
              {
                label: 'Terms',
                destination: '/terms',
              },
            ]}
            matcher={(link, location) =>
              link.destination === location.toString()
            }
          />
          <DiscountProvider>
            <QueryProvider>
              <AppRouter />
            </QueryProvider>
          </DiscountProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
