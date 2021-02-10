export const ProductQuery = `
query fetchProduct($handle: String!)
  {
    productByHandle(handle: $handle) {
      variants(first: 100) {
        edges {
          node {
            sku
            id
            priceV2 {
              amount
            }
            quantityAvailable
          }
        }
      }
      metafields(first: 50) {
        edges {
          node {
            namespace
            key
            value
          }
        }
      }
    }
  }
`
