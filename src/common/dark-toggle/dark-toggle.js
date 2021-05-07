import React, { useEffect, useContext } from "react"
import { ThemeContext } from "../../context/darkModeContext"
import * as css from "./index.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon } from "@fortawesome/free-solid-svg-icons/faMoon"
import { faSun } from "@fortawesome/free-solid-svg-icons/faSun"
import { COLOR_MODE_KEY } from "../../constants"

const DarkToggle = () => {
  const { colorMode, setColorMode } = useContext(ThemeContext)

  useEffect(() => {
    let colorMode = localStorage.getItem(COLOR_MODE_KEY)
    if (!colorMode) {
      colorMode = "light"
    }
    setColorMode(colorMode)
  }, [colorMode, setColorMode])

  const accessibilityClick = e => {
    if (
      e.key === " " ||
      e.key === "Enter" ||
      e.key === "Spacebar" ||
      e.type === "click"
    ) {
      setColorMode(e.target.checked ? "dark" : "light")
    }
  }

  return (
    <div className={css.dark_toggle_container} tabIndex="-1">
      <input
        aria-pressed="false"
        role="button"
        aria-label={`toggle to ${
          colorMode === "dark" ? "light" : "dark"
        } theme`}
        onKeyDown={e => accessibilityClick(e)}
        onClick={e => accessibilityClick(e)}
        type="checkbox"
        className={css.checkbox}
        id="chk"
        checked={colorMode === "dark"}
        tabIndex="0"
      />
      <label className={css.label} htmlFor="chk" tabIndex="-1">
        <FontAwesomeIcon icon={faMoon} className={css.fa_moon} />
        <FontAwesomeIcon icon={faSun} className={css.fa_moon} />
        <div className={css.ball}></div>
      </label>
    </div>
  )
}

export default DarkToggle
