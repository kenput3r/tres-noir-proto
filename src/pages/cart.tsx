import React, { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { CartContext } from "../context/cartContext"
import loader from "../images/tres-noir-waycooler-lens-animation.svg"

const Page = styled.div`
  .lineItem {
    border-bottom: 1px solid #000;
    padding-bottom: 1.45rem;
    margin-bottom: 1.45rem;
  }
  .image-container {
    max-width: 200px;
  }
`

const Cart = () => {
  const { checkout, removeFromCart, updateLineItem } = useContext(CartContext)
  const [lineItems, setLineItems] = useState({})
  console.log(checkout)
  
  const changeQty = (id: string, value: string) => {
    const qty: number = parseInt(value)
    setLineItems({
      ...lineItems,
      [id]: value
    })
    updateLineItem(id, qty)
  }

  useEffect(() => {
    if (checkout && checkout.lineItems) {
      const tempLineItems = {}
      for (let item of checkout.lineItems) {
        tempLineItems[item.id] = item.quantity
      }
      setLineItems(tempLineItems)
    }
  }, [checkout])
  return (
    <Layout>
      <SEO title="Cart" />
      <Page>
        <h1>Cart</h1>
        {checkout && checkout.lineItems && checkout.lineItems.length ? (
          checkout.lineItems.map(lineItem => (
            <div className="lineItem" key={lineItem.id}>
              <div className="image-container">
                <img
                  src={lineItem.variant.image.src}
                  alt={lineItem.variant.image.altText}
                />
              </div>
              {lineItem.title} - {lineItem.variant.title} &times;{" "}
              {lineItem.quantity} [{lineItem.variant.price}]{" "}
              <button onClick={() => removeFromCart(lineItem.id)}>
                remove
              </button>
              <input
                type="number"
                value={lineItems[lineItem.id]}
                onChange={e => changeQty(lineItem.id, e.target.value)}
              />
            </div>
          ))
        ) : (
          <div>
            {checkout && checkout.lineItems && !checkout.lineItems.length ? (
              <p>Nothing in your cart yet.</p>
            ) : (
              <p>
                <img src={loader} alt="loading" />
              </p>
            )}
          </div>
        )}
      </Page>
    </Layout>
  )
}

export default Cart
