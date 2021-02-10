import { graphql } from "gatsby"

export const CustomizationFragment = graphql`
  fragment CustomizationFragment on ShopifyProduct {
    description
    descriptionHtml
    title
    variants {
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
      shopifyId
    }
  }
`
