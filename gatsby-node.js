const path = require("path")

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const products = await graphql(`
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
          }
        }
      }
    }
  `)

  products.data.allShopifyProduct.edges.forEach(
    ({ node: { handle, id, metafields } }) => {
      let template = "product"
      if (metafields.length) {
        metafields.map(node => {
          if (node.key == "gatsby_template_name" && node.value) {
            template = node.value
          }
        })
      }
      createPage({
        path: `/products/${handle}`,
        component: path.resolve(`./src/templates/${template}.js`),
        context: {
          id,
          handle,
        },
      })
    }
  )
}
