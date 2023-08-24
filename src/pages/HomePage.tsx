/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import {
  LegacyCard,
  Page,
  Layout,
  TextContainer,
  LegacyStack,
  Link,
} from '@shopify/polaris';

export function HomePage() {
  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <LegacyCard sectioned>
            <LegacyStack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <LegacyStack.Item fill>
                <TextContainer spacing="loose">
                  <h1>Welcome to the TIKI app 🎉</h1>
                  <p>
                    Lorem ipsum dolor sit amet{' '}
                    <Link url="https://polaris.shopify.com/" external>
                      Polaris design system
                    </Link>
                    ,{' '}
                    <Link url="https://shopify.dev/api/admin-graphql" external>
                      Shopify Admin API
                    </Link>
                    , and{' '}
                    <Link
                      url="https://shopify.dev/apps/tools/app-bridge"
                      external
                    >
                      App Bridge
                    </Link>{' '}
                    UI library and components.
                  </p>
                  <p>Ready to go? Start by configuring your app. </p>
                  <p>
                    Learn more about building out with TIKI in{' '}
                    <Link
                      url="https://shopify.dev/apps/getting-started/add-functionality"
                      external
                    >
                      this Shopify tutorial
                    </Link>{' '}
                    📚{' '}
                  </p>
                </TextContainer>
              </LegacyStack.Item>
            </LegacyStack>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
