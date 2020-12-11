const endpoint = process.env.GATSBY_STORE_ENDPOINT
const token = process.env.GATSBY_STORE_TOKEN
const headers = {
  "Content-type": "application/json",
  Accept: "application/json",
  "X-Shopify-Storefront-Access-Token": token,
}

export default async function fetchAvailableQty(handle) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query: query(handle), variables: { handle } }),
  })
  const response_json = await response.json()
  const formatted_data = formatData(response_json.data.productByHandle)
  return formatted_data
}

const formatData = data => {
  const metafields = {}
  const variants = {}
  for (let variant of data.variants.edges) {
    const id = variant.node.id
    const quantityAvailable = variant.node.quantityAvailable
    variants[id] = { quantityAvailable }
  }
  for (let metafield of data.metafields.edges) {
    const namespace = metafield.node.namespace
    const key = metafield.node.key
    const value = metafield.node.value
    if (!metafields[namespace]) {
      metafields[namespace] = {}
    }
    metafields[namespace][key] = value
  }
  return { metafields, variants }
}

const query = () => `
query fetchProduct($handle: String!)
  {
    productByHandle(handle: $handle) {
      variants(first: 100) {
        edges {
          node {
            sku
            id
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
