require("dotenv").config({
  path: `.env`,
})
module.exports = {
  siteMetadata: {
    title: `Tres Noir`,
    description: `Tres Noir is an independent eyewear company located in Santa Ana, Calif.`,
    author: `@kenput3r`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/tres-noir-favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-shopify`,
      options: {
        shopName: `tresnoir.com`,
        accessToken: process.env.GATSBY_STORE_TOKEN,
        apiVersion: `2020-10`,
        paginationSize: 250,
        shopifyQueries: {
          articles: `
            query GetArticles($first: Int!, $after: String) {
              articles(first: $first, after: $after) {
                pageInfo {
                  hasNextPage
                }
                edges {
                  cursor
                  node {
                    author {
                      bio
                      email
                      firstName
                      lastName
                      name
                    }
                    blog {
                      id
                    }
                    comments(first: 250) {
                      edges {
                        node {
                          author {
                            email
                            name
                          }
                          content
                          contentHtml
                          id
                        }
                      }
                    }
                    content
                    contentHtml
                    excerpt
                    excerptHtml
                    id
                    handle
                    image {
                      altText
                      id
                      src
                    }
                    publishedAt
                    tags
                    title
                    url
                    seo {
                      title
                      description
                    }
                  }
                }
              }
            }
          `,
          blogs: `
            query GetBlogs($first: Int!, $after: String) {
              blogs(first: $first, after: $after) {
                pageInfo {
                  hasNextPage
                }
                edges {
                  cursor
                  node {
                    id
                    handle
                    title
                    url
                  }
                }
              }
            }
          `,
          collections: `
            query GetCollections($first: Int!, $after: String) {
              collections(first: $first, after: $after) {
                pageInfo {
                  hasNextPage
                }
                edges {
                  cursor
                  node {
                    description
                    descriptionHtml
                    handle
                    id
                    image {
                      altText
                      id
                      src
                    }
                    products(first: 250) {
                      edges {
                        node {
                          id
                        }
                      }
                    }
                    title
                    updatedAt
                  }
                }
              }
            }
          `,
          products: `
            query GetProducts($first: Int!, $after: String) {
              products(first: $first, after: $after) {
                pageInfo {
                  hasNextPage
                }
                edges {
                  cursor
                  node {
                    availableForSale
                    createdAt
                    description
                    descriptionHtml
                    handle
                    id
                    images(first: 250) {
                      edges {
                        node {
                          id
                          altText
                          originalSrc
                        }
                      }
                    }
                    metafields(first: 250) {
                      edges {
                        node {
                          description
                          id
                          key
                          namespace
                          value
                          valueType
                        }
                      }
                    }
                    onlineStoreUrl
                    options {
                      id
                      name
                      values
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
                    publishedAt
                    tags
                    title
                    updatedAt
                    variants(first: 250) {
                      edges {
                        node {
                          availableForSale
                          compareAtPrice
                          compareAtPriceV2 {
                            amount
                            currencyCode
                          }
                          id
                          image {
                            altText
                            id
                            originalSrc
                          }
                          metafields(first: 250) {
                            edges {
                              node {
                                description
                                id
                                key
                                namespace
                                value
                                valueType
                              }
                            }
                          }
                          price
                          priceV2 {
                            amount
                            currencyCode
                          }
                          requiresShipping
                          selectedOptions {
                            name
                            value
                          }
                          sku
                          title
                          weight
                          weightUnit
                          presentmentPrices(first: 250) {
                            edges {
                              node {
                                price {
                                  amount
                                  currencyCode
                                }
                                compareAtPrice {
                                  amount
                                  currencyCode
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    vendor
                  }
                }
              }
            }
          `,
          shopPolicies: `
            query GetPolicies {
              shop {
                privacyPolicy {
                  body
                  id
                  title
                  url
                }
                refundPolicy {
                  body
                  id
                  title
                  url
                }
                termsOfService {
                  body
                  id
                  title
                  url
                }
              }
            }
          `,
          pages: `
            query GetPages($first: Int!, $after: String) {
              pages(first: $first, after: $after) {
                pageInfo {
                  hasNextPage
                }
                edges {
                  cursor
                  node {
                    id
                    handle
                    title
                    body
                    bodySummary
                    updatedAt
                    url
                  }
                }
              }
            }
          `,
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
