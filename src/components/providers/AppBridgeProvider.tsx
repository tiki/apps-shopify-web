/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { useMemo, useState } from 'react';
import { To, useLocation, useNavigate } from 'react-router-dom';
import { Provider } from '@shopify/app-bridge-react';
import { AppConfigV2 } from '@shopify/app-bridge';

export function AppBridgeProvider(props: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const history = useMemo(
    () => ({
      replace: (path: To) => {
        navigate(path, { replace: true });
      },
    }),
    [navigate],
  );

  const routerConfig = useMemo(
    () => ({ history, location }),
    [history, location],
  );

  const apiKey = '1949a2edb1cab0db98cdf67e81742982'; // process.env.SHOPIFY_API_KEY

  const [appBridgeConfig] = useState(() => {
    const host = new URLSearchParams(location.search).get('host');
    return {
      host,
      apiKey,
      forceRedirect: true,
    } as AppConfigV2;
  });

  return (
    <Provider config={appBridgeConfig} router={routerConfig}>
      {props.children}
    </Provider>
  );
}
