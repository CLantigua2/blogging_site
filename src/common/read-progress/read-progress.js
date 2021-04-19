import React, { useEffect, useState } from "react"
import { motion, useViewportScroll } from "framer-motion"
import * as css from "./styles.module.css"

const ReadProgress = ({ parentWidth }) => {
  const { scrollYProgress } = useViewportScroll()
  const [currYProgress, setCurrYProgress] = useState(scrollYProgress)

  useEffect(() => {
    return scrollYProgress.onChange(v => {
      setCurrYProgress(v)
    })
  }, [scrollYProgress])

  console.log({ parentWidth })

  return (
    <motion.div
      className={css.reading_progress}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 2,
        width: "100%",
        transform: `scaleX(${Math.round((currYProgress / 1) * 100) / 100})`,
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,255,1), rgba(0,255,0,1))",
        fontSize: 40,
        fontFamily: "sans-serif",
        zIndex: 5,
        opacity: 0.5,
      }}
      initial={{
        originX: 0,
      }}
    ></motion.div>
  )
}

export default ReadProgress
