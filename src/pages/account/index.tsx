import React, { useContext, useEffect } from "react"
import { CustomerContext } from "../../context/customerContext"

const Account = () => {
  const { getCustomer } = useContext(CustomerContext)
  useEffect(() => {
    getCustomer()
  }, [getCustomer])
  return <div>no account yet</div>
}

export default Account