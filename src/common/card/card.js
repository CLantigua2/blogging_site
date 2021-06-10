import React from "react"
import * as css from "./css.module.css"

const Card = ({ children, padding }) => {
  const handleStyling = () => {
    switch (padding) {
      case "medium":
        return css.medium
      case "large":
        return css.large
      default:
        return css.small
    }
  }
  return <div className={`${css.container} ${handleStyling()}`}>{children}</div>
}

export default Card
