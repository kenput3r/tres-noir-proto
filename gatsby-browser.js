import React from "react"
import { CartProvider } from "./src/context/cartContext"
import { CustomerProvider } from "./src/context/customerContext"

export const wrapRootElement = ({ element }) => (
  <CartProvider>
    <CustomerProvider>{element}</CustomerProvider>
  </CartProvider>
)
