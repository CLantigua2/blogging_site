import React from "react"
import * as css from "./style.module.css"

const Button = ({ variant = "button", type, value = null }) => {
  const baseOfVariant = () => {
    if (variant === "input") {
      return (
        <input
          type={type}
          value={value}
          className={`${css.button} ${css.clear_button}`}
        />
      )
    }
    return (
      <button type={type} className={`${css.button} ${css.submit_button}`}>
        {value}
      </button>
    )
  }
  return baseOfVariant()
}

export default Button
