import React from "react"
import * as css from "./css.module.css"

const Card = ({ children }) => {
  return <div className={css.container}>{children}</div>
}

export default Card
