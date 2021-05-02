import React, { useContext } from "react"
import { useSpring, animated, config } from "react-spring"
import { ThemeContext } from "../../context/darkModeContext"
import * as css from "./styles.module.css" // // Icons made by Freepik from www.flaticon.com

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`
const trans2 = (x, y) => `translate3d(${x / 4}px,${y / 8 - 230}px,0)`
const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`
const trans4 = (x, y) => `translate3d(${x / 5}px,${y / 10 + 40}px,0)`

function ParallaxImage() {
  const { colorMode } = useContext(ThemeContext)
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: config.gentle,
  }))

  return (
    <div className={css.block}>
      <button
        className={css.container}
        aria-labelledby="parallax image of Carlos with a cartoon background of a beach"
        onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
      >
        <animated.div
          className={`${
            colorMode === "light" ? css.card1_light : css.card1_dark
          }`}
          style={{ transform: props.xy.to(trans1) }}
        ></animated.div>
        <animated.div
          className={`${
            colorMode === "light" ? css.card2_light : css.card2_dark
          }`}
          style={{ transform: props.xy.to(trans2) }}
        />
        <animated.div
          className={css.card4}
          style={{ transform: props.xy.to(trans4) }}
        />
        <animated.div
          className={css.card3}
          style={{ transform: props.xy.to(trans3) }}
        />
      </button>
    </div>
  )
}

export default ParallaxImage
