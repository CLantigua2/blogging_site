import React, { useContext } from "react"
// import * as styles from "./index.module.css"
import ScrollContext from "../../context/scrollContext"
import { Link } from "gatsby"

const ListLink = ({
  to,
  isMenuOpen,
  toggle,
  scrollButton,
  scrollTo,
  children,
}) => {
  const [, setScrollTo] = useContext(ScrollContext)
  return (
    <li>
      <Link
        to={to}
        onClick={e => {
          if (isMenuOpen !== undefined && isMenuOpen === true) {
            toggle(false)
          }
          const isBroswer = typeof window !== undefined
          if (isBroswer && window.location.pathname === "/") {
            if (scrollButton) {
              e.preventDefault()
              setScrollTo(scrollTo)
            }
          }
          return
        }}
      >
        {children}
      </Link>
    </li>
  )
}

export default ListLink
