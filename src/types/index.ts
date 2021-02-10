export type DataProps = {
  shopifyProduct: any
}

export type ProductUpdates = {
  metafields: any,
  variants: [
    {
      node: {
        sku: string,
        id: string,
        priceV2: {
          amount: string
        },
        quantityAvailable: number
      }
    }
  ]
}

export type CustomerInfo = {
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
  acceptsMarketing?: boolean,
  phone?: string
}

export type CustomerCreateError = {
  code: string,
  field: string[],
  message: string
}

export type CustomerCreateResponse = {
  data: {
    customerCreate: {
      customer: null | string,
      customerUserErrors?: CustomerCreateError[]
    }
  }
}