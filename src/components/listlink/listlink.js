import React, { useContext } from "react"
// import * as styles from "./index.module.css"
import ScrollContext from "../../context/scrollContext"
import Link from "next/link"

const ListLink = ({
  href,
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
        href={href}
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
        <a>{children}</a>
      </Link>
    </li>
  )
}

export default ListLink
