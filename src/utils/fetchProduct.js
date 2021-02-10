import { ProductQuery } from "./queries"
const endpoint = process.env.GATSBY_STORE_ENDPOINT
const token = process.env.GATSBY_STORE_TOKEN
const headers = {
  "Content-type": "application/json",
  Accept: "application/json",
  "X-Shopify-Storefront-Access-Token": token,
}

/**
 * @function fetchProduct - fetches current product data
 * @param {string} handle
 * @returns {object} {metafields: {}, variants: {}}
 */
export default async function fetchProduct(handle) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query: ProductQuery, variables: { handle } }),
  })
  const response_json = await response.json()
  const formatted_data = formatData(response_json)
  return formatted_data
}

const formatData = ({ data }) => {
  const metafields = data.productByHandle.metafields.edges
  const variants = data.productByHandle.variants.edges
  // for (let variant of data.variants.edges) {
  //   const id = variant.node.id
  //   const quantityAvailable = variant.node.quantityAvailable
  //   const priceV2 = variant.node.priceV2
  //   variants[id] = { quantityAvailable, priceV2, id }
  // }
  // for (let metafield of data.metafields.edges) {
  //   const namespace = metafield.node.namespace
  //   const key = metafield.node.key
  //   const value = metafield.node.value
  //   if (!metafields[namespace]) {
  //     metafields[namespace] = {}
  //   }
  //   metafields[namespace][key] = value
  // }
  return { metafields, variants }
}
