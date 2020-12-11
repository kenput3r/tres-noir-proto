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
 * @function displayPrice - conditionally returns a price or price range
 * @param {*} priceRange
 * @returns {string}
 */
const displayPrice = priceRange => {
  const minPrice = priceRange.minVariantPrice.amount
  const maxPrice = priceRange.maxVariantPrice.amount
  const currencyCode = priceRange.minVariantPrice.currencyCode
  if (minPrice !== maxPrice) {
    return `${minPrice} - ${maxPrice} ${currencyCode}`
  }
}

const Product = ({ data }) => {
  const { shopifyProduct: product } = data
  const { addToCart } = useContext(CartContext)
  const [rtData, setRtData] = useState(null)
  const [maxSelect, setMaxSelect] = useState([1])
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0].shopifyId
  )
  const [selectedQty, setSelectedQty] = useState(1)

  /**
   * @function changeVariant
   * @param {string} variant
   * sets selected variant and max select quantity
   */
  const changeVariant = variant => {
    console.log("================start changeVariant=================")
    console.log("...setting selected variant")
    setSelectedVariant(variant)
    console.log("...creating new max quantity array")
    const newMaxSelect = newQuantitySelectArray(
      rtData.variants[variant].quantityAvailable
    )
    console.log("...setting max quantity")
    setMaxSelect(newMaxSelect)
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
      console.log("...setting real time data", fetchedProduct)
      setRtData(fetchedProduct)
      console.log("...creating new max quantity array")
      const newMaxSelect = newQuantitySelectArray(
        fetchedProduct.variants[selectedVariant].quantityAvailable
      )
      console.log("...setting max quantity")
      setMaxSelect(newMaxSelect)
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
        <h2>{displayPrice(product.priceRange)}</h2>
        <form>
          <div className="form-group">
            <select
              aria-label="Product Variant"
              onChange={e => changeVariant(e.target.value)}
            >
              {product.variants.map(variant => (
                <option key={variant.id} value={variant.shopifyId}>
                  {variant.title} - {variant.priceV2.amount}{" "}
                  {variant.priceV2.currencyCode}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <select
              aria-label="Quantity"
              disabled={!maxSelect.length}
              onBlur={e => setSelectedQty(e.target.value)}
            >
              {!maxSelect.length && <option>sold out</option>}
              {maxSelect.map(number => (
                <option key={`qty-` + number} value={number}>
                  {number}
                </option>
              ))}
            </select>
            <input
              type="button"
              value="Add to cart"
              disabled={!maxSelect.length}
              onClick={() =>
                addToCart({ id: selectedVariant, qty: selectedQty })
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
