import { Link } from "gatsby"
import React from "react"
import logo from "../images/tres-noir-icon-large.png"

const Header = () => (
  <header>
    <h1 style={{ textAlign: "center" }}>
      <img
        src={logo}
        alt="Tres Noir"
        height="120px"
        style={{ marginBottom: 0 }}
      />
    </h1>
  </header>
)

export default Header
