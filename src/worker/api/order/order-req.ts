/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export interface OrderReq {
  customer: {
    id: number;
  };
  discount_applications: Array<{
    type: string;
    title: string;
    description: string;
    value: string;
    value_type: string;
    allocation_method: string;
    target_selection: string;
    target_type: string;
  }>;
}


/**
 * 
 * export interface OrderReq {
    id:                             number;
    adminGraphqlAPIID:              string;
    appID:                          null;
    browserIP:                      null;
    buyerAcceptsMarketing:          boolean;
    cancelReason:                   string;
    cancelledAt:                    Date;
    cartToken:                      null;
    checkoutID:                     null;
    checkoutToken:                  null;
    clientDetails:                  null;
    closedAt:                       null;
    confirmed:                      boolean;
    contactEmail:                   string;
    createdAt:                      Date;
    currency:                       Currency;
    currentSubtotalPrice:           string;
    currentSubtotalPriceSet:        Set;
    currentTotalAdditionalFeesSet:  null;
    currentTotalDiscounts:          string;
    currentTotalDiscountsSet:       Set;
    currentTotalDutiesSet:          null;
    currentTotalPrice:              string;
    currentTotalPriceSet:           Set;
    currentTotalTax:                string;
    currentTotalTaxSet:             Set;
    customerLocale:                 string;
    deviceID:                       null;
    discountCodes:                  any[];
    email:                          string;
    estimatedTaxes:                 boolean;
    financialStatus:                string;
    fulfillmentStatus:              string;
    landingSite:                    null;
    landingSiteRef:                 null;
    locationID:                     null;
    merchantOfRecordAppID:          null;
    name:                           string;
    note:                           null;
    noteAttributes:                 any[];
    number:                         number;
    orderNumber:                    number;
    orderStatusURL:                 string;
    originalTotalAdditionalFeesSet: null;
    originalTotalDutiesSet:         null;
    paymentGatewayNames:            string[];
    phone:                          null;
    presentmentCurrency:            Currency;
    processedAt:                    null;
    reference:                      null;
    referringSite:                  null;
    sourceIdentifier:               null;
    sourceName:                     string;
    sourceURL:                      null;
    subtotalPrice:                  string;
    subtotalPriceSet:               Set;
    tags:                           string;
    taxLines:                       any[];
    taxesIncluded:                  boolean;
    test:                           boolean;
    token:                          string;
    totalDiscounts:                 string;
    totalDiscountsSet:              Set;
    totalLineItemsPrice:            string;
    totalLineItemsPriceSet:         Set;
    totalOutstanding:               string;
    totalPrice:                     string;
    totalPriceSet:                  Set;
    totalShippingPriceSet:          Set;
    totalTax:                       string;
    totalTaxSet:                    Set;
    totalTipReceived:               string;
    totalWeight:                    number;
    updatedAt:                      Date;
    userID:                         null;
    billingAddress:                 Address;
    customer:                       Customer;
    discountApplications:           any[];
    fulfillments:                   any[];
    lineItems:                      LineItem[];
    paymentTerms:                   null;
    refunds:                        any[];
    shippingAddress:                Address;
    shippingLines:                  ShippingLine[];
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
    latitude?:    null;
    longitude?:   null;
    name:         string;
    countryCode:  string;
    provinceCode: string;
    id?:          number;
    customerID?:  number;
    countryName?: string;
    default?:     boolean;
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
    createdAt:                 null;
    updatedAt:                 null;
    firstName:                 string;
    lastName:                  string;
    state:                     string;
    note:                      null;
    verifiedEmail:             boolean;
    multipassIdentifier:       null;
    taxExempt:                 boolean;
    phone:                     null;
    emailMarketingConsent:     EmailMarketingConsent;
    smsMarketingConsent:       null;
    tags:                      string;
    currency:                  Currency;
    acceptsMarketingUpdatedAt: null;
    marketingOptInLevel:       null;
    taxExemptions:             any[];
    adminGraphqlAPIID:         string;
    defaultAddress:            Address;
}

export interface EmailMarketingConsent {
    state:            string;
    optInLevel:       null;
    consentUpdatedAt: null;
}

export interface LineItem {
    id:                         number;
    adminGraphqlAPIID:          string;
    attributedStaffs:           AttributedStaff[];
    fulfillableQuantity:        number;
    fulfillmentService:         string;
    fulfillmentStatus:          null;
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
    variantTitle:               null;
    vendor:                     null;
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
    carrierIdentifier:             null;
    code:                          null;
    deliveryCategory:              null;
    discountedPrice:               string;
    discountedPriceSet:            Set;
    phone:                         null;
    price:                         string;
    priceSet:                      Set;
    requestedFulfillmentServiceID: null;
    source:                        string;
    title:                         string;
    taxLines:                      any[];
    discountAllocations:           any[];
}

{ 
    "id": 820982911946154508, 
    "admin_graphql_api_id": "gid:\\/\\/shopify\\/Order\\/820982911946154508", 
    "app_id": null, 
    "browser_ip": null, 
    "buyer_accepts_marketing": true, 
    "cancel_reason": "customer", 
    "cancelled_at": "2021-12-31T19:00:00-05:00", 
    "cart_token": null, 
    "checkout_id": null, 
    "checkout_token": null, 
    "client_details": null, 
    "closed_at": null, 
    "confirmed": false, 
    "contact_email": "jon@example.com", 
    "created_at": "2021-12-31T19:00:00-05:00", 
    "currency": "USD", 
    "current_subtotal_price": "398.00", 
    "current_subtotal_price_set": { 
      "shop_money": { 
        "amount": "398.00", 
        "currency_code": "USD" 
      }, 
      "presentment_money": { 
        "amount": "398.00", 
        "currency_code": "USD" 
      } 
    }, 
    "current_total_additional_fees_set": null, 
    "current_total_discounts": "0.00", 
    "current_total_discounts_set": { 
      "shop_money": { 
        "amount": "0.00", 
        "currency_code": "USD" 
      }, 
      "presentment_money": { 
        "amount": "0.00", 
        "currency_code": "USD" 
      } 
    }, 
    "current_total_duties_set": null, 
    "current_total_price": "398.00", 
    "current_total_price_set": { 
      "shop_money": { 
        "amount": "398.00", 
        "currency_code": "USD" 
      }, 
      "presentment_money": { 
        "amount": "398.00", 
        "currency_code": "USD" 
      } 
    }, 
    "current_total_tax": "0.00", 
    "current_total_tax_set": { 
      "shop_money": { 
        "amount": "0.00", 
        "currency_code": "USD" 
      }, 
      "presentment_money": { 
        "amount": "0.00", 
        "currency_code": "USD" 
      } 
    }, 
    "customer_locale": "en", 
    "device_id": null, 
    "discount_codes": [ 
   
    ], 
    "email": "jon@example.com", 
    "estimated_taxes": false, 
    "financial_status": "voided", 
    "fulfillment_status": "pending", 
    "landing_site": null, 
    "landing_site_ref": null, 
    "location_id": null, 
    "merchant_of_record_app_id": null, 
    "name": "#9999", 
    "note": null, 
    "note_attributes": [ 
   
    ], 
    "number": 234, 
    "order_number": 1234, 
    "order_status_url": "https:\\/\\/jsmith.myshopify.com\\/548380009\\/orders\\/123456abcd\\/authenticate?key=abcdefg", 
    "original_total_additional_fees_set": null, 
    "original_total_duties_set": null, 
    "payment_gateway_names": [ 
      "visa", 
      "bogus" 
    ], 
    "phone": null, 
    "presentment_currency": "USD", 
    "processed_at": null, 
    "reference": null, 
    "referring_site": null, 
    "source_identifier": null, 
    "source_name": "web", 
    "source_url": null, 
    "subtotal_price": "393.00", 
    "subtotal_price_set": { 
      "shop_money": { 
        "amount": "393.00", 
        "currency_code": "USD" 
      }, 
      "presentment_money": { 
        "amount": "393.00", 
        "currency_code": "USD" 
      } 
    }, 
    "tags": "", 
    "tax_lines": [ 
   
    ], 
    "taxes_included": false, 
    "test": true, 
    "token": "123456abcd", 
    "total_discounts": "5.00", 
    "total_discounts_set": { 
      "shop_money": { 
        "amount": "5.00", 
        "currency_code": "USD" 
      }, 
      "presentment_money": { 
        "amount": "5.00", 
        "currency_code": "USD" 
      } 
    }, 
    "total_line_items_price": "398.00", 
    "total_line_items_price_set": { 
      "shop_money": { 
        "amount": "398.00", 
        "currency_code": "USD" 
      }, 
      "presentment_money": { 
        "amount": "398.00", 
        "currency_code": "USD" 
      } 
    }, 
    "total_outstanding": "398.00", 
    "total_price": "403.00", 
    "total_price_set": { 
      "shop_money": { 
        "amount": "403.00", 
        "currency_code": "USD" 
      }, 
      "presentment_money": { 
        "amount": "403.00", 
        "currency_code": "USD" 
      } 
    }, 
    "total_shipping_price_set": { 
      "shop_money": { 
        "amount": "10.00", 
        "currency_code": "USD" 
      }, 
      "presentment_money": { 
        "amount": "10.00", 
        "currency_code": "USD" 
      } 
    }, 
    "total_tax": "0.00", 
    "total_tax_set": { 
      "shop_money": { 
        "amount": "0.00", 
        "currency_code": "USD" 
      }, 
      "presentment_money": { 
        "amount": "0.00", 
        "currency_code": "USD" 
      } 
    }, 
    "total_tip_received": "0.00", 
    "total_weight": 0, 
    "updated_at": "2021-12-31T19:00:00-05:00", 
    "user_id": null, 
    "billing_address": { 
      "first_name": "Steve", 
      "address1": "123 Shipping Street", 
      "phone": "555-555-SHIP", 
      "city": "Shippington", 
      "zip": "40003", 
      "province": "Kentucky", 
      "country": "United States", 
      "last_name": "Shipper", 
      "address2": null, 
      "company": "Shipping Company", 
      "latitude": null, 
      "longitude": null, 
      "name": "Steve Shipper", 
      "country_code": "US", 
      "province_code": "KY" 
    }, 
    "customer": { 
      "id": 115310627314723954, 
      "email": "john@example.com", 
      "accepts_marketing": false, 
      "created_at": null, 
      "updated_at": null, 
      "first_name": "John", 
      "last_name": "Smith", 
      "state": "disabled", 
      "note": null, 
      "verified_email": true, 
      "multipass_identifier": null, 
      "tax_exempt": false, 
      "phone": null, 
      "email_marketing_consent": { 
        "state": "not_subscribed", 
        "opt_in_level": null, 
        "consent_updated_at": null 
      }, 
      "sms_marketing_consent": null, 
      "tags": "", 
      "currency": "USD", 
      "accepts_marketing_updated_at": null, 
      "marketing_opt_in_level": null, 
      "tax_exemptions": [ 
   
      ], 
      "admin_graphql_api_id": "gid:\\/\\/shopify\\/Customer\\/115310627314723954", 
      "default_address": { 
        "id": 715243470612851245, 
        "customer_id": 115310627314723954, 
        "first_name": null, 
        "last_name": null, 
        "company": null, 
        "address1": "123 Elm St.", 
        "address2": null, 
        "city": "Ottawa", 
        "province": "Ontario", 
        "country": "Canada", 
        "zip": "K2H7A8", 
        "phone": "123-123-1234", 
        "name": "", 
        "province_code": "ON", 
        "country_code": "CA", 
        "country_name": "Canada", 
        "default": true 
      } 
    }, 
    "discount_applications": [ 
   
    ], 
    "fulfillments": [ 
   
    ], 
    "line_items": [ 
      { 
        "id": 866550311766439020, 
        "admin_graphql_api_id": "gid:\\/\\/shopify\\/LineItem\\/866550311766439020", 
        "attributed_staffs": [ 
          { 
            "id": "gid:\\/\\/shopify\\/StaffMember\\/902541635", 
            "quantity": 1 
          } 
        ], 
        "fulfillable_quantity": 1, 
        "fulfillment_service": "manual", 
        "fulfillment_status": null, 
        "gift_card": false, 
        "grams": 567, 
        "name": "IPod Nano - 8GB", 
        "price": "199.00", 
        "price_set": { 
          "shop_money": { 
            "amount": "199.00", 
            "currency_code": "USD" 
          }, 
          "presentment_money": { 
            "amount": "199.00", 
            "currency_code": "USD" 
          } 
        }, 
        "product_exists": true, 
        "product_id": 632910392, 
        "properties": [ 
   
        ], 
        "quantity": 1, 
        "requires_shipping": true, 
        "sku": "IPOD2008PINK", 
        "taxable": true, 
        "title": "IPod Nano - 8GB", 
        "total_discount": "0.00", 
        "total_discount_set": { 
          "shop_money": { 
            "amount": "0.00", 
            "currency_code": "USD" 
          }, 
          "presentment_money": { 
            "amount": "0.00", 
            "currency_code": "USD" 
          } 
        }, 
        "variant_id": 808950810, 
        "variant_inventory_management": "shopify", 
        "variant_title": null, 
        "vendor": null, 
        "tax_lines": [ 
   
        ], 
        "duties": [ 
   
        ], 
        "discount_allocations": [ 
   
        ] 
      }, 
      { 
        "id": 141249953214522974, 
        "admin_graphql_api_id": "gid:\\/\\/shopify\\/LineItem\\/141249953214522974", 
        "attributed_staffs": [ 
   
        ], 
        "fulfillable_quantity": 1, 
        "fulfillment_service": "manual", 
        "fulfillment_status": null, 
        "gift_card": false, 
        "grams": 567, 
        "name": "IPod Nano - 8GB", 
        "price": "199.00", 
        "price_set": { 
          "shop_money": { 
            "amount": "199.00", 
            "currency_code": "USD" 
          }, 
          "presentment_money": { 
            "amount": "199.00", 
            "currency_code": "USD" 
          } 
        }, 
        "product_exists": true, 
        "product_id": 632910392, 
        "properties": [ 
   
        ], 
        "quantity": 1, 
        "requires_shipping": true, 
        "sku": "IPOD2008PINK", 
        "taxable": true, 
        "title": "IPod Nano - 8GB", 
        "total_discount": "0.00", 
        "total_discount_set": { 
          "shop_money": { 
            "amount": "0.00", 
            "currency_code": "USD" 
          }, 
          "presentment_money": { 
            "amount": "0.00", 
            "currency_code": "USD" 
          } 
        }, 
        "variant_id": 808950810, 
        "variant_inventory_management": "shopify", 
        "variant_title": null, 
        "vendor": null, 
        "tax_lines": [ 
   
        ], 
        "duties": [ 
   
        ], 
        "discount_allocations": [ 
   
        ] 
      } 
    ], 
    "payment_terms": null, 
    "refunds": [ 
   
    ], 
    "shipping_address": { 
      "first_name": "Steve", 
      "address1": "123 Shipping Street", 
      "phone": "555-555-SHIP", 
      "city": "Shippington", 
      "zip": "40003", 
      "province": "Kentucky", 
      "country": "United States", 
      "last_name": "Shipper", 
      "address2": null, 
      "company": "Shipping Company", 
      "latitude": null, 
      "longitude": null, 
      "name": "Steve Shipper", 
      "country_code": "US", 
      "province_code": "KY" 
    }, 
    "shipping_lines": [ 
      { 
        "id": 271878346596884015, 
        "carrier_identifier": null, 
        "code": null, 
        "delivery_category": null, 
        "discounted_price": "10.00", 
        "discounted_price_set": { 
          "shop_money": { 
            "amount": "10.00", 
            "currency_code": "USD" 
          }, 
          "presentment_money": { 
            "amount": "10.00", 
            "currency_code": "USD" 
          } 
        }, 
        "phone": null, 
        "price": "10.00", 
        "price_set": { 
          "shop_money": { 
            "amount": "10.00", 
            "currency_code": "USD" 
          }, 
          "presentment_money": { 
            "amount": "10.00", 
            "currency_code": "USD" 
          } 
        }, 
        "requested_fulfillment_service_id": null, 
        "source": "shopify", 
        "title": "Generic Shipping", 
        "tax_lines": [ 
   
        ], 
        "discount_allocations": [ 
   
        ] 
      } 
    ] 
  }

 */