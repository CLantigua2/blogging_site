import * as React from "react"
import { motion } from "framer-motion"
import MenuItem from "../menu-item"
import * as css from "./styles.module.css"

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

export const Navigation = ({ toggle }) => {
  const navItems = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Articles", to: "/articles" },
    { name: "Contact", to: "/contact" },
  ]
  return (
    <motion.ul variants={variants} className={`link_list ${css.ul}`}>
      {navItems.map((item, i) => (
        <MenuItem
          i={i}
          key={i}
          to={item.to}
          text={item.name}
          toggleOpen={toggle}
        />
      ))}
    </motion.ul>
  )
}
