import React from "react"
import { motion } from "framer-motion"

export const PageTransition = ({ children }) => {
  return (
    <motion.main
      initial={{
        opacity: 0,
        x: -100,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: 100,
      }}
      transition={{
        type: "spring",
        mass: 0.35,
        stiffness: 75,
        duration: 0.5,
      }}
    >
      {children}
    </motion.main>
  )
}
