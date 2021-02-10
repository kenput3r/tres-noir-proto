const path = require("path")

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const pageable = await graphql(`
    query PagesQuery {
      allShopifyProduct {
        edges {
          node {
            handle
            id
            metafields {
              key
              value
            }
            productType
          }
        }
      }
      allShopifyCollection {
        edges {
          node {
            handle
            id
          }
        }
      }
    }
  `)

  pageable.data.allShopifyProduct.edges.forEach(
    ({ node: { handle, id, metafields, productType } }) => {
      let template = "product"
      if (metafields.length) {
        metafields.map(node => {
          if (node.key == "gatsby_template_name" && node.value) {
            template = node.value
          }
        })
      }
      if (productType === "Glasses") {
        template = "product-customizable"
      }
      if (
        productType !== "Lense Customization" &&
        productType !== "Lens Customization"
      ) {
        createPage({
          path: `/products/${handle}`,
          component: path.resolve(`./src/templates/${template}.tsx`),
          context: {
            id,
            handle,
          },
        })
      }
    }
  )
  pageable.data.allShopifyCollection.edges.forEach(
    ({ node: { handle, id } }) => {
      const template = "collection"
      createPage({
        path: `/collections/${handle}`,
        component: path.resolve(`./src/templates/${template}.tsx`),
        context: {
          id,
          handle,
        },
      })
    }
  )
}
