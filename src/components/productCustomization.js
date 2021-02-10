import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

const Component = styled.div``

const ProductCustomization = () => {
  const data = useStaticQuery(graphql`
    query CustomizationForm {
      nonPrescription: shopifyProduct(
        handle: { eq: "non-prescription-lense" }
      ) {
        ...CustomizationFragment
      }
      singleVision: shopifyProduct(handle: { eq: "single-vision" }) {
        ...CustomizationFragment
      }
      bifocal: shopifyProduct(handle: { eq: "bifocal" }) {
        ...CustomizationFragment
      }
      progressive: shopifyProduct(handle: { eq: "progressive" }) {
        ...CustomizationFragment
      }
      clearNonPrescription: shopifyProduct(
        handle: { eq: "clear-non-prescription" }
      ) {
        ...CustomizationFragment
      }
      blueLightBlocking: shopifyProduct(handle: { eq: "blue-light-blocking" }) {
        ...CustomizationFragment
      }
      sunTint: shopifyProduct(handle: { eq: "sun-tint" }) {
        ...CustomizationFragment
      }
      transitions: shopifyProduct(handle: { eq: "transitions" }) {
        ...CustomizationFragment
      }
      polarized: shopifyProduct(handle: { eq: "polarized" }) {
        ...CustomizationFragment
      }
      gradientTint: shopifyProduct(handle: { eq: "gradient-tint" }) {
        ...CustomizationFragment
      }
      vantage: shopifyProduct(handle: { eq: "vantage" }) {
        ...CustomizationFragment
      }
      cr39: shopifyProduct(handle: { eq: "cr39" }) {
        ...CustomizationFragment
      }
      polyCarbonate: shopifyProduct(handle: { eq: "poly-carbonate" }) {
        ...CustomizationFragment
      }
      hiIndex: shopifyProduct(handle: { eq: "hi-index" }) {
        ...CustomizationFragment
      }
      noCoating: shopifyProduct(handle: { eq: "no-coating" }) {
        ...CustomizationFragment
      }
      antiReflectiveStandard: shopifyProduct(
        handle: { eq: "anti-reflective-fusion-xto" }
      ) {
        ...CustomizationFragment
      }
      antiReflectivePremium: shopifyProduct(
        handle: { eq: "anti-reflective-coat-crizal" }
      ) {
        ...CustomizationFragment
      }
      scratchCoat: shopifyProduct(handle: { eq: "scratch-coat" }) {
        ...CustomizationFragment
      }
      uvCoat: shopifyProduct(handle: { eq: "uv-coat" }) {
        ...CustomizationFragment
      }
    }
  `)
  return (
    <Component>
      <p>Single Vision title: {data.singleVision.title}</p>
    </Component>
  )
}

export default ProductCustomization
