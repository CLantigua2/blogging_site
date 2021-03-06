import React from "react"
import * as css from "./styles.module.css"

const Textarea = ({ label, name, id, rows }) => {
  return (
    <div className={css.input_container}>
      <label>{label}</label>
      <textarea className={css.input} rows={rows} name={name} id={id} />
    </div>
  )
}

export default Textarea
