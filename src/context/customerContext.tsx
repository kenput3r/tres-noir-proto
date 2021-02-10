import React, { createContext, useState, useEffect } from "react"
import { CustomerInfo, CustomerCreateResponse } from "../types/"
import { customerCreate } from "../utils/mutations"

const endpoint = process.env.GATSBY_STORE_ENDPOINT
const token = process.env.GATSBY_STORE_TOKEN
const headers = {
  "Content-type": "application/json",
  Accept: "application/json",
  "X-Shopify-Storefront-Access-Token": token,
}

const createCustomerResponse: CustomerCreateResponse = {
  data: {
    customerCreate: {
      customer: null
    }
  }
}

const defaultContext = {
  createCustomer: async (info: CustomerInfo) => createCustomerResponse,
  logIn: function (info: CustomerInfo) {},
  logOut: function () {},
  getCustomer: function () {},
}

export const CustomerContext = createContext(defaultContext)

export const CustomerProvider = ({ children }) => {

  /**
   * @method  createCustomer - Creates a Shopify Customer
   * @param {CustomerInfo} info 
   * @returns json response from customerCreate mutation
   */
  const createCustomer = async (info: CustomerInfo) => {
    const input = { ...info }
    console.log(input)
    const response = await fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ query: customerCreate, variables: { input } }),
    })
    const response_json = await response.json()
    return response_json
  }
  const logIn = info => {
    console.log("================start logIn=================")
    console.log("customer", info)
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
