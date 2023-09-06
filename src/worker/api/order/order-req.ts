/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */


 export interface OrderReq {
    id?:                             number;
    adminGraphqlAPIID?:              string;
    appID?:                         number;
    browserIP?:                     string;
    buyerAcceptsMarketing?:          boolean;
    cancelReason?:                   string;
    cancelledAt?:                    Date;
    cartToken?:                     string;
    checkoutID?:                    number;
    checkoutToken?:                 string;
    clientDetails?:                 ClientDetails;
    closedAt?:                      string;
    confirmed?:                      boolean;
    contactEmail?:                   string;
    createdAt?:                      Date;
    currency?:                       Currency;
    currentSubtotalPrice?:           string;
    currentSubtotalPriceSet?:        Set;
    currentTotalAdditionalFeesSet?: string;
    currentTotalDiscounts?:          string;
    currentTotalDiscountsSet?:       Set;
    currentTotalDutiesSet?:         string;
    currentTotalPrice?:              string;
    currentTotalPriceSet?:           Set;
    currentTotalTax?:                string;
    currentTotalTaxSet?:             Set;
    customerLocale?:                 string;
    deviceID?:                      number;
    discountCodes?:                  any[];
    email?:                          string;
    estimatedTaxes?:                 boolean;
    financialStatus?:                string;
    fulfillmentStatus?:              string;
    landingSite?:                   string;
    landingSiteRef?:                string;
    locationID?:                    number;
    merchantOfRecordAppID?:         number;
    name?:                           string;
    note?:                          string;
    noteAttributes?:                 any[];
    number?:                         number;
    orderNumber?:                    number;
    orderStatusURL?:                 string;
    originalTotalAdditionalFeesSet?:Set;
    originalTotalDutiesSet?:        Set;
    paymentGatewayNames?:            string[];
    phone?:                         string;
    presentmentCurrency?:            Currency;
    processedAt?:                   string;
    reference?:                     string;
    referringSite?:                 string;
    sourceIdentifier?:              string;
    sourceName?:                     string;
    sourceURL?:                     string;
    subtotalPrice?:                  string;
    subtotalPriceSet?:               Set;
    tags?:                           string;
    taxLines?:                       any[];
    taxesIncluded?:                  boolean;
    test?:                           boolean;
    token?:                          string;
    totalDiscounts?:                 string;
    totalDiscountsSet?:              Set;
    totalLineItemsPrice?:            string;
    totalLineItemsPriceSet?:         Set;
    totalOutstanding?:               string;
    totalPrice?:                     string;
    totalPriceSet?:                  Set;
    totalShippingPriceSet?:          Set;
    totalTax?:                       string;
    totalTaxSet?:                    Set;
    totalTipReceived?:               string;
    totalWeight?:                    number;
    updatedAt?:                      Date;
    userID?:                        number;
    billingAddress?:                 Address;
    customer?:                       Customer;
    discountApplications?:           any[];
    fulfillments?:                   any[];
    lineItems?:                      LineItem[];
    paymentTerms?:                  string;
    refunds?:                        any[];
    shippingAddress?:                Address;
    shippingLines?:                  ShippingLine[];
}

export function toOrderReq (order:any): OrderReq {
  const orderReq: OrderReq = {
    id:                             order.id,
    adminGraphqlAPIID:              order.admin_graphql_api_id,
    appID:                         order.app_id,
    browserIP:                     order.browser_ip,
    buyerAcceptsMarketing:          order.buyer_accepts_marketing,
    cancelReason:                   order.cancel_reason,
    cancelledAt:                    order.cancelled_at,
    cartToken:                     order.cart_token,
    checkoutID:                    order.checkout_id,
    checkoutToken:                 order.checkout_token,
    clientDetails:                 order.client_details,
    closedAt:                      order.closed_at,
    confirmed:                      order.confirmed,
    contactEmail:                   order.contact_email,
    createdAt:                      order.created_at,
    currency:                       order.currency,
    currentSubtotalPrice:           order.current_subtotal_price,
    currentSubtotalPriceSet:        order.current_subtotal_price_set,
    currentTotalAdditionalFeesSet: order.current_total_additional_fees_set,
    currentTotalDiscounts:          order.current_total_discounts,
    currentTotalDiscountsSet:       order.current_total_discounts_set,
    currentTotalDutiesSet:         order.current_total_duties_set,
    currentTotalPrice:              order.current_total_price,
    currentTotalPriceSet:           order.current_total_price_set,
    currentTotalTax:                order.current_total_tax,
    currentTotalTaxSet:             order.current_total_tax_set,
    customerLocale:                 order.customer_locale,
    deviceID:                      order.device_id,
    discountCodes:                  order.discount_codes,
    email:                          order.email,
    estimatedTaxes:                 order.estimated_taxes,
    financialStatus:                order.financial_status,
    fulfillmentStatus:              order.fulfillment_status,
    landingSite:                   order.landing_site,
    landingSiteRef:                order.landing_site_ref,
    locationID:                    order.location_id,
    merchantOfRecordAppID:         order.merchant_of_record_app_id,
    name:                           order.name,
    note:                          order.note,
    noteAttributes:                 order.note_attributes,
    number:                         order.number,
    orderNumber:                    order.order_number,
    orderStatusURL:                 order.order_status_url,
    originalTotalAdditionalFeesSet: order.original_total_additional_fees_set,
    originalTotalDutiesSet:        order.original_total_duties_set,
    paymentGatewayNames:            order.payment_gateway_names,
    phone:                         order.phone,
    presentmentCurrency:            order.presentment_currency,
    processedAt:                   order.processed_at,
    reference:                     order.reference,
    referringSite:                 order.referring_site,
    sourceIdentifier:              order.source_identifier,
    sourceName:                     order.source_name,
    sourceURL:                     order.source_url,
    subtotalPrice:                  order.subtotal_price,
    subtotalPriceSet:               order.subtotal_price_set,
    tags:                           order.tags,
    taxLines:                       order.tax_lines,
    taxesIncluded:                  order.taxes_included,
    test:                           order.test,
    token:                          order.token,
    totalDiscounts:                 order.total_discount,
    totalDiscountsSet:              order.total_discounts_set,
    totalLineItemsPrice:            order.total_line_items_price,
    totalLineItemsPriceSet:         order.total_line_items_price_set,
    totalOutstanding:               order.total_outstanding,
    totalPrice:                     order.total_price,
    totalPriceSet:                  order.total_price_set,
    totalShippingPriceSet:          order.total_shipping_price_set,
    totalTax:                       order.total_tax,
    totalTaxSet:                    order.total_tax_set,
    totalTipReceived:               order.total_tip_received,
    totalWeight:                    order.total_weight,
    updatedAt:                      order.updated_at,
    userID:                        order.user_id,
    billingAddress:                 order.billing_address,
    customer:                       order.customer,
    discountApplications:           order.discount_applications,
    fulfillments:                   order.fulfillments,
    lineItems:                      order.line_items,
    paymentTerms:                  order.payment_terms,
    refunds:                        order.refunds,
    shippingAddress:                order.shipping_address,
    shippingLines:                  order.shipping_lines
  }
  return orderReq
}
export interface Address {
    firstName:    null | string;
    address1:     string;
    phone:        string;
    city:         string;
    zip:          string;
    province:     string;
    country:      string;
    lastName:     null | string;
    address2:     null;
    company:      null | string;
    latitude?:    string;
    longitude?:   string;
    name:         string;
    countryCode:  string;
    provinceCode: string;
    id?:          number;
    customerID?:  number;
    countryName?: string;
    default?:     boolean;
}

export interface ClientDetails {
  accept_language?: string,
  browser_height?: string,
  browser_ip?: string,
  browser_width?: string,
  session_hash?: string,
  user_agente?: string
}

export enum Currency {
    Usd = "USD",
}

export interface Set {
    shopMoney:        Money;
    presentmentMoney: Money;
}

export interface Money {
    amount:       string;
    currencyCode: Currency;
}

export interface Customer {
    id:                        number;
    email:                     string;
    acceptsMarketing:          boolean;
    createdAt?:                 string;
    updatedAt?:                 string;
    firstName:                 string;
    lastName:                  string;
    state:                     string;
    note?:                      string;
    verifiedEmail:             boolean;
    multipassIdentifier?:       string;
    taxExempt:                 boolean;
    phone?:                     string;
    emailMarketingConsent:     EmailMarketingConsent;
    smsMarketingConsent?:      string;
    tags:                      string;
    currency:                  Currency;
    acceptsMarketingUpdatedAt?: string;
    marketingOptInLevel?:       string;
    taxExemptions:             any[];
    adminGraphqlAPIID:         string;
    defaultAddress:            Address;
}

export interface EmailMarketingConsent {
    state:            string;
    optInLevel?:       string;
    consentUpdatedAt?: string;
}

export interface LineItem {
    id:                         number;
    adminGraphqlAPIID:          string;
    attributedStaffs:           AttributedStaff[];
    fulfillableQuantity:        number;
    fulfillmentService:         string;
    fulfillmentStatus?:         string;
    giftCard:                   boolean;
    grams:                      number;
    name:                       string;
    price:                      string;
    priceSet:                   Set;
    productExists:              boolean;
    productID:                  number;
    properties:                 any[];
    quantity:                   number;
    requiresShipping:           boolean;
    sku:                        string;
    taxable:                    boolean;
    title:                      string;
    totalDiscount:              string;
    totalDiscountSet:           Set;
    variantID:                  number;
    variantInventoryManagement: string;
    variantTitle?:              string;
    vendor?:                    string;
    taxLines:                   any[];
    duties:                     any[];
    discountAllocations:        any[];
}

export interface AttributedStaff {
    id:       string;
    quantity: number;
}

export interface ShippingLine {
    id:                            number;
    carrierIdentifier?:            string;
    code?:                         string;
    deliveryCategory?:             string;
    discountedPrice:               string;
    discountedPriceSet:            Set;
    phone?:                        string;
    price:                         string;
    priceSet:                      Set;
    requestedFulfillmentServiceID?: number;
    source:                        string;
    title:                         string;
    taxLines:                      any[];
    discountAllocations:           any[];
}
