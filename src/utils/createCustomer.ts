import { customerCreate } from "./mutations"
import { CustomerInfo } from "../types/"
const endpoint = process.env.GATSBY_STORE_ENDPOINT
const token = process.env.GATSBY_STORE_TOKEN
const headers = {
  "Content-type": "application/json",
  Accept: "application/json",
  "X-Shopify-Storefront-Access-Token": token,
}

export default async function createCustomer(info: CustomerInfo) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ mutation: customerCreate, variables: { ...info } }),
  })
  const response_json = await response.json()
  return response_json
}