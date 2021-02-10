# Templates

Templates are used for the dynamically created pages generated at build time, via the createPage API found in gatsby-node.js.

---

## collection.tsx

A collection of Shopify products

---

## product-customizable.tsx

The single product view page for products that are customizable. The page is initially populated with most of its data at build time, but does have a chain of asyncronous events that update the page with realtime information, such as inventory availability.

### Page load sequence of events

1. Static content is rendered and stateful variables are initized with default values
2. Product is fetched via Shopify Storefront API
3. [variants] inventory availability is update
4. [selectedVariant] is updated to the first variant with available inventory
