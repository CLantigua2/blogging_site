import * as React from "react"
import { motion } from "framer-motion"
import * as css from "./styles.module.css"
import Link from "next/link"

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

const MenuItem = ({ i, href, text, toggleOpen }) => {
  const handleClick = () => {
    if (typeof toggleOpen !== undefined) {
      toggleOpen()
    }
  }
  return (
    <motion.li
      className={css.li}
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={href} onClick={() => handleClick()}>
        <a>{text}</a>
      </Link>
    </motion.li>
  )
}

export default MenuItem
