import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import logo from "../images/tres-noir-icon-large.png"

const Component = styled.header`
  li {
    display: inline-block;
    list-style-type: none;
    padding: 5px;
  }
`

const Header = () => (
  <Component>
    <h1 style={{ textAlign: "center" }}>
      <img
        src={logo}
        alt="Tres Noir"
        height="120px"
        style={{ marginBottom: 0 }}
      />
    </h1>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/collections/all">Products</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/account/register">Register</Link>
        </li>
      </ul>
    </nav>
  </Component>
)

export default Header
