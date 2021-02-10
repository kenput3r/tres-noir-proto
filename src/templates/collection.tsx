import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Page = styled.div`
  .temp_product {
    display: inline-block;
    margin: 0 50px 50px 50px;
    max-width: 200px;
    width: 200px;
    p {
      margin-bottom: 5px;
    }
  }
  li {
    display: inline-block;
    list-style-type: none;
    padding: 10px;
  }
`
const addProductTypes = (collection, productTypes) => {
  for (let i = 0; i < collection.products.length; i++) {
    const type = collection.products[i].productType
    if (type && productTypes.indexOf(type) === -1) {
      productTypes.push(type)
    }
  }
}

/**
 * @function Collection - The exported page component
 * @param {*} data - the data sourced from the graphql page query
 */
const Collection = ({ data }) => {
  const { shopifyCollection: collection } = data
  const { products } = collection
  const productTypes = ["All"]
  addProductTypes(collection, productTypes)
  const [filter, setFilter] = useState("")
  const filteredProducts = filter
    ? products.filter(product => product.productType === filter)
    : products
  const handleFilter = type => {
    console.log("handle filter")
    if (type === "All") {
      setFilter("")
    } else {
      setFilter(type)
    }
  }
  return (
    <Layout>
      <SEO title={collection.title} />
      <Page>
        <h1>{collection.title}</h1>
        <ul>
          {productTypes.map(type => (
            <li key={`type-${type}`}>
              <button onClick={() => handleFilter(type)}>{type}</button>
            </li>
          ))}
        </ul>
        {filteredProducts.map(product => (
          <div key={product.shopifyId} className="temp_product">
            {product.images && product.images.length && (
              <Img
                fluid={product.images[0].localFile.childImageSharp.fluid}
                alt={product.images[0].altText}
              />
            )}
            <p>
              <Link to={`/products/${product.handle}`}>{product.title}</Link>
            </p>
            <p>
              starting at{" "}
              {new Number(product.priceRange.minVariantPrice.amount).toFixed(2)}
            </p>
          </div>
        ))}
      </Page>
    </Layout>
  )
}

export default Collection

export const query = graphql`
  query CollectionQuery($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      handle
      id
      title
      products {
        handle
        images {
          altText
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
          }
          maxVariantPrice {
            amount
          }
        }
        productType
        shopifyId
        title
      }
    }
  }
`
