import React from "react"
import * as css from "./index.module.css"
import Card from "../card"

const CardContent = ({ children }) => {
  return (
    <Card>
      <div className={css.card_content}>{children}</div>
    </Card>
  )
}

export default CardContent
