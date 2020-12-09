import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import logo from "../images/tres-noir-icon-large.png"

const Page = styled.div`
  h1 {
    text-align: center;
    text-transform: uppercase;
    img {
      width: 120px;
    }
  }
  .placeholder {
    width: 480px;
    max-width: 100%;
    margin: 0 auto;
  }
`

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <Page>
      <h1>
        <img src={logo} alt="Tres Noir" />
        <br />
        Headless Shopify Powered by Gatsby for Tres Noir
      </h1>
      <div className="placeholder">
        <Img
          fluid={data.placeholderImage.childImageSharp.fluid}
          alt="Greetings from California"
        />
      </div>
    </Page>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query HomePage {
    placeholderImage: file(relativePath: { eq: "greetings.png" }) {
      childImageSharp {
        fluid(maxWidth: 480) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
