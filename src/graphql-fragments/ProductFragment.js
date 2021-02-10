import { graphql } from "gatsby"

export const ProductFragment = graphql`
  fragment ProductFragment on ShopifyProduct {
    description
    descriptionHtml
    handle
    id
    images {
      altText
      id
      localFile {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    productType
    shopifyId
    tags
    title
    vendor
    variants {
      availableForSale
      compareAtPriceV2 {
        amount
        currencyCode
      }
      graphId: id
      image {
        altText
        localFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      priceV2 {
        amount
        currencyCode
      }
      id: shopifyId
      sku
      title
      selectedOptions {
        name
        value
      }
    }
  }
`
