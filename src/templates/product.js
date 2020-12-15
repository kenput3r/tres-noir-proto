import React, { useState, useEffect, useContext } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import newQuantitySelectArray from "../utils/newQuantitySelectArray"
import fetchProduct from "../utils/fetchProduct"
import { CartContext } from "../context/cartContext"

const Page = styled.div`
  .product-image {
    max-width: 400px;
  }
`

const createMarkup = markup => {
  return { __html: markup }
}

/**
 * @function Product - The exported page component
 * @param {*} data - the data sourced from the graphql page query
 */
const Product = ({ data }) => {
  const { shopifyProduct: product } = data
  const { addToCart } = useContext(CartContext)
  const [variants, setVariants] = useState(product.variants)
  const [maxQty, setMaxQty] = useState([1])
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [selectedQty, setSelectedQty] = useState(1)

  /**
   * @function updateVariants - adds the current available quantity to the variants
   * @param {object} updates
   */
  const updateVariants = updates => {
    console.log("================start updateVariants=================")
    const temp_variants = [...variants]
    for (let i = 0; i < updates.variants.length; i++) {
      const { node } = updates.variants[i]
      const matchIds = object => object.shopifyId === node.id
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
  const setIntialVariant = fetchedProduct => {
    console.log("================start setInitialVariant=================")
    const variants = fetchedProduct.variants
    for (let i = 0; i < variants.length; i++) {
      const { node } = variants[i]
      if (node.quantityAvailable > 0) {
        console.log(`...set selected variant ${node}`)
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
  const changeVariant = async json => {
    console.log("================start changeVariant=================")
    const variant = await JSON.parse(json)
    setSelectedVariant(variant)
    console.log(`...set selected variant ${variant}`)
    const newMaxQty = newQuantitySelectArray(variant.quantityAvailable)
    console.log(`...created new max quantity array ${newMaxQty}`)
    if (variant.quantityAvailable < selectedQty) {
      setSelectedQty(1)
      console.log(`...set selected qty to 1`)
    }
    setMaxQty(newMaxQty)
    console.log(`...set max quantity ${newMaxQty}`)
    console.log("=================end changeVariant==================")
  }

  /**
   * @function changeQty
   * @param {number} qty
   * sets selectedQty
   */
  const changeQty = qty => {
    console.log("================start changeVariant=================")
    setSelectedQty(qty)
    console.log(`...changed selected qty to ${qty}`)
    console.log("=================end changeVariant==================")
  }

  /**
   * Run once, then only update if dependent's values have changed
   */
  useEffect(() => {
    console.log("================start useEffect=================")
    ;(async () => {
      console.log("...fetching products")
      const fetchedProduct = await fetchProduct(product.handle)
      updateVariants(fetchedProduct)
      setIntialVariant(fetchedProduct)
      console.log("=================end useEffect==================")
    })()
  }, [product.handle])
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
              onChange={e => changeQty(e.target.value)}
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
              onClick={() =>
                addToCart({ id: selectedVariant.shopifyId, qty: selectedQty })
              }
            />
          </div>
        </form>
        <p dangerouslySetInnerHTML={createMarkup(product.descriptionHtml)} />
      </Page>
    </Layout>
  )
}

export default Product

export const query = graphql`
  query ProductQuery($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      description
      descriptionHtml
      handle
      id
      images {
        altText
        id
        localFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      productType
      shopifyId
      tags
      title
      vendor
      variants {
        availableForSale
        compareAtPriceV2 {
          amount
          currencyCode
        }
        id
        image {
          altText
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        priceV2 {
          amount
          currencyCode
        }
        shopifyId
        sku
        title
        selectedOptions {
          name
          value
        }
      }
    }
  }
`
