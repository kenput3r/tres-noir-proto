import React, { createContext, useState, useEffect } from "react"

const defaultContext = {
  createCustomer: function () {},
  logIn: function () {},
  logOut: function () {},
  getCustomer: function () {},
}

export const CustomerContext = createContext(defaultContext)

export const CustomerProvider = ({ children }) => {
  const createCustomer = customer => {
    console.log("================start createCustomer=================")
    console.log("customer", customer)
    console.log("=================end createCustomer==================")
  }
  const logIn = customer => {
    console.log("================start logIn=================")
    console.log("customer", customer)
    console.log("=================end logIn==================")
  }
  const logOut = () => {
    console.log("================start logOut=================")
    console.log("not logged in yet")
    console.log("=================end logOut==================")
  }
  const getCustomer = () => {
    console.log("================start getCustomer=================")
    console.log("no customer yet")
    console.log("=================end getCustomer==================")
  }
  return (
    <CustomerContext.Provider
      value={{ createCustomer, logIn, logOut, getCustomer }}
    >
      {children}
    </CustomerContext.Provider>
  )
}
