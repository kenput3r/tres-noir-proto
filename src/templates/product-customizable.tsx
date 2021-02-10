import React, { useState, useEffect, useContext } from "react"
import { PageProps, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import newQuantitySelectArray from "../utils/newQuantitySelectArray"
import fetchProduct from "../utils/fetchProduct"
import { CartContext } from "../context/cartContext"
import ProductCustomization from "../components/productCustomization"
import { DataProps, ProductUpdates } from "../types/"

const Page = styled.div`
  .product-image {
    max-width: 400px;
  }
`

const createMarkup = (markup: any) => {
  return { __html: markup }
}

/**
 * @function ProductCustomizable - The exported page component
 * @param {*} data - the data sourced from the graphql page query
 */
const ProductCustomizable: React.FC<PageProps<DataProps>> = ({ data }) => {
  const { shopifyProduct: product } = data
  const { addToCart } = useContext(CartContext)
  const [variants, setVariants] = useState(product.variants)
  const [maxQty, setMaxQty] = useState([1])
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [selectedQty, setSelectedQty] = useState(1)
  const [lineItems, setLineItems] = useState([
    { variantId: product.variants[0].id, quantity: selectedQty },
  ])

  /**
   * @function updateVariants - adds the current available quantity to the variants
   * @param {object} updates
   */
  const updateVariants = (updates: ProductUpdates) => {
    console.log("================start updateVariants=================")
    const temp_variants = [...variants]
    for (let i = 0; i < updates.variants.length; i++) {
      const { node } = updates.variants[i]
      const matchIds = object => object.id === node.id
      const index = temp_variants.findIndex(matchIds)
      temp_variants[index].quantityAvailable = node.quantityAvailable
    }
    setVariants(temp_variants)
    console.log(`...set variants ${temp_variants}`)
    console.log("================end updateVariants=================")
  }

  /**
   * @function setInitialVariant - sets the first available variant
   * @param {object} fetchedProduct - the current product data
   */
  const setIntialVariant = (fetchedProduct: ProductUpdates) => {
    console.log("================start setInitialVariant=================")
    const variants = fetchedProduct.variants
    for (let i = 0; i < variants.length; i++) {
      const { node } = variants[i]
      if (node.quantityAvailable > 0) {
        console.log(`...set selected variant ${node}`)
        console.log(node)
        setSelectedVariant(node)
        const newMaxQty = newQuantitySelectArray(node.quantityAvailable)
        setMaxQty(newMaxQty)
        break
      }
    }
    console.log("=================end setInitialVariant==================")
  }

  /**
   * @function changeVariant
   * @param {string} json
   * sets selected variant and max select quantity
   */
  const changeVariant = async (json: string) => {
    console.log("================start changeVariant=================")
    const variant = await JSON.parse(json)
    setSelectedVariant(variant)
    console.log(`...set selected variant ${variant}`)
    console.log(variant)
    const newMaxQty = newQuantitySelectArray(variant.quantityAvailable)
    console.log(`...created new max quantity array ${newMaxQty}`)
    if (variant.quantityAvailable < selectedQty) {
      setSelectedQty(1)
      console.log(`...set selected qty to 1`)
    }
    setMaxQty(newMaxQty)
    console.log("lineItems", lineItems)
    console.log(`...set max quantity ${newMaxQty}`)
    console.log("=================end changeVariant==================")
  }

  /**
   * @function changeQty
   * @param {Event} event
   * sets selectedQty
   */
  const changeQty = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("================start changeVariant=================")
    const qty: number = parseInt(event.target.value)
    setSelectedQty(qty)
    console.log(`...changed selected qty to ${qty}`)
    console.log("=================end changeVariant==================")
  }

  /**
   * Fetches realtime product data, then updates stateful variants
   * and sets the selected variant to the first available variant
   */
  useEffect(() => {
    console.log("================start useEffect=================")
    ;(async () => {
      console.log("...fetching products")
      const fetchedProduct: ProductUpdates = await fetchProduct(product.handle)
      console.log(fetchedProduct)
      updateVariants(fetchedProduct)
      setIntialVariant(fetchedProduct)
      console.log("=================end useEffect==================")
    })()
  }, [product.handle])

  /**
   * Sets the stateful lineItem to the currently selected variant
   */
  useEffect(() => {
    setLineItems([
      {
        variantId: selectedVariant.id,
        quantity: selectedQty,
      },
    ])
  }, [selectedVariant, selectedQty])
  console.log(lineItems)
  return (
    <Layout>
      <SEO title={product.title} description={product.description} />
      <Page>
        <div className="product-image">
          <Img
            fluid={product.images[0].localFile.childImageSharp.fluid}
            alt={product.images[0].alt}
          />
        </div>
        <h1>{product.title}</h1>
        <h2>{selectedVariant.priceV2.amount} USD</h2>
        <form>
          <div className="form-group">
            <select
              aria-label="Product Variant"
              onChange={e => changeVariant(e.target.value)}
            >
              {variants.map(variant =>
                variant.quantityAvailable < 0 ? (
                  <option
                    key={variant.id}
                    value={JSON.stringify(variant)}
                    disabled={true}
                    selected={false}
                  >
                    {variant.title} - {variant.priceV2.amount}{" "}
                    {variant.priceV2.currencyCode}
                  </option>
                ) : (
                  <option key={variant.id} value={JSON.stringify(variant)}>
                    {variant.title} - {variant.priceV2.amount}{" "}
                    {variant.priceV2.currencyCode}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="form-group">
            <select
              aria-label="Quantity"
              disabled={!maxQty.length}
              onChange={e => changeQty(e)}
            >
              {!maxQty.length && <option>sold out</option>}
              {maxQty.map(number => (
                <option key={`qty-` + number} value={number}>
                  {number}
                </option>
              ))}
            </select>
            <input
              type="button"
              value="Add to cart"
              disabled={!maxQty.length}
              onClick={() => addToCart(lineItems)}
            />
          </div>
        </form>
        <p dangerouslySetInnerHTML={createMarkup(product.descriptionHtml)} />
        <ProductCustomization />
      </Page>
    </Layout>
  )
}

export default ProductCustomizable

export const query = graphql`
  query ProductCustomizableQuery($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      ...ProductFragment
    }
  }
`
