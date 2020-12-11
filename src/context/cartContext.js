import React, { createContext, useState, useEffect } from "react"

const defaultContext = {
  addToCart: function () {},
  removeFromCart: function () {},
  getCart: function () {},
}

export const CartContext = createContext(defaultContext)

export const CartProvider = ({ children }) => {
  const addToCart = item => {
    console.log("================start addToCart=================")
    console.log("item", item)
    console.log("=================end addToCart==================")
  }
  const removeFromCart = item => {
    console.log("================start removeFromCart=================")
    console.log("item", item)
    console.log("=================end removeFromCart==================")
  }
  const getCart = () => {
    console.log("================start getCart=================")
    console.log("no cart yet")
    console.log("=================end getCart==================")
  }
  return (
    <CartContext.Provider value={{ addToCart, removeFromCart, getCart }}>
      {children}
    </CartContext.Provider>
  )
}
