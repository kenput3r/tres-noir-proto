import { string } from "prop-types"
import React, { createContext, useState, useEffect } from "react"
import Client from "shopify-buy"

const client = Client.buildClient({
  domain: process.env.GATSBY_STORE_MY_SHOPIFY,
  storefrontAccessToken: process.env.GATSBY_STORE_TOKEN,
})

const isBrowser = typeof window !== "undefined"

type LineItem = {
  variantId: string
  quantity: number
}

const defaultContext = {
  addToCart: async function (line_items: LineItem[]):Promise<void> {},
  removeFromCart: async function (itemId: string):Promise<void> {},
  checkout: null,
  updateLineItem: async function (id: string, quantity: number):Promise<void>{}

}

export const CartContext = createContext(defaultContext)

export const CartProvider = ({ children }) => {
  const [checkoutId, setCheckoutId] = useState<string>(null)
  const [checkout, setCheckout] = useState<Client.Cart | undefined>(undefined)

  /**
   * @function getCheckoutCookie - gets the current non-expired chechout id
   * @returns {string} checkout id
   */
  const getCheckoutCookie = () => {
    console.log("================start getCheckoutCookie=================")
    const name = "shopifyCheckout="
    const decodedDocumentCookie = decodeURIComponent(document.cookie)
    const cookies = decodedDocumentCookie.split(";")
    for (let cookie of cookies) {
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1)
      }
      if (cookie.indexOf(name) === 0) {
        cookie = cookie.substring(name.length, cookie.length)
        console.log(
          "=================end getCheckoutCookie cookie=================="
        )
        return cookie
      }
    }
    console.log("=================end getCheckoutCookie null==================")
    return null
  }

  /**
   * @function getNewCheckout - creates a new Shopify checkout
   * and sets the shopifyCheckout cookie (Shopify checkout ID)
   * @returns {Client.Cart} checkout
   */
  const getNewCheckout = async () => {
    console.log("================start getNewCheckout=================")
    try {
      const newCheckout = await client.checkout.create()
      if (isBrowser) {
        document.cookie = `shopifyCheckout=${newCheckout.id};max-age=2592000`
      }
      console.log("new checkout id", newCheckout.id)
      return newCheckout
    } catch (e) {
      console.error(e)
    }
    console.log("================end getNewCheckout=================")
  }

  /**
   * @function initializeCheckout - fetches current or creates new Shopify checkout
   * sets checkout [setCheckout]
   */
  const initializeCheckout = async () => {
    console.log("================start initializeCheckout=================")
    try {
      //Check if checkout exists
      const checkoutId = isBrowser ? getCheckoutCookie() : null
      let checkout: Client.Cart | null = null
      //if Checkout exists, fetch it from Shopify
      if (checkoutId) {
        checkout = await client.checkout.fetch(checkoutId)
        if (checkout.completedAt) {
          //previous checkout has been completed
          console.log("previous checkout has been completed")
          checkout = await getNewCheckout()
        }
        //if no Checkout exists, create a new one
      } else {
        checkout = await getNewCheckout()
      }
      setCheckout(checkout)
      setCheckoutId(`${checkout.id}`)
    } catch (e) {
      console.error(e)
    }
    console.log("================end initializeCheckout=================")
  }

  /**
   * @function addToCart - Adds product to the current checkout
   * @param {LineItem[]} line_items - array of items to add to cart
   */
  const addToCart = async (line_items: LineItem[]) => {
    console.log("add to cart", line_items)
    try {
      const updatedCheckout = await client.checkout.addLineItems(
        checkoutId,
        line_items
      )
      console.log(updatedCheckout)
      setCheckout(updatedCheckout)
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * @function removeFromCart - removes line item from cart
   * @param {String} itemId - the line item id
   */
  const removeFromCart = async (itemId: string) => {
    console.log("================start removeFromCart=================")
    const response = await client.checkout.removeLineItems(checkoutId, [itemId])
    console.log(response)
    setCheckout(response)
    console.log("=================end removeFromCart==================")
  }

  const updateLineItem = async (id: string, quantity: number) => {
    const response = await client.checkout.updateLineItems(checkoutId, [{id, quantity}])
    setCheckout(response)
  }

  useEffect(() => {
    if (!checkoutId) {
      initializeCheckout()
    }
  }, [checkoutId])

  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        checkout,
        updateLineItem
      }}
    >
      {children}
    </CartContext.Provider>
  )
}