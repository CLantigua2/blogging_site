import React, { useRef } from "react"
import * as css from "./styles.module.css"
import { motion, useCycle } from "framer-motion"
import { useDimensions } from "../../hooks/use-dimensions"
import { Navigation } from "../navigation/navigation"
import { MenuToggle } from "../menu-toggle/menu-toggle"

const overlayStyle = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    opacity: 0,
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
}

const Overlay = () => {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = useRef(null)
  const { height } = useDimensions(containerRef)

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className={css.nav}
    >
      <motion.div
        className={css.background}
        variants={overlayStyle}
      ></motion.div>
      <Navigation toggle={() => toggleOpen()} />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.div>
  )
}

export default Overlay
