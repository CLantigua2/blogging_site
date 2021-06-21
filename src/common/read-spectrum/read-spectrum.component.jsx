import React, { useState, useEffect } from "react"
import * as css from "./styles.module.css"

let totalSeconds = 0

const ReadSpectrum = ({ readDuration, loaded }) => {
  const [displayTime, setDisplayTime] = useState("00:00")
  const [counter, setCounter] = useState(0)
  useEffect(() => {
    if (loaded) {
      let timesRun = 0
      let timer = setInterval(() => {
        timesRun += 1
        if (timesRun === readDuration) {
          clearInterval(timer)
        }
        ++totalSeconds
        setDisplayTime(
          `${pad(parseInt(totalSeconds / 60, 10))}:${pad(
            parseInt(totalSeconds % 60, 10)
          )}`
        )
        setCounter(prev => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    } else {
      setDisplayTime("00:00")
      setCounter(0)
      totalSeconds = 0
    }
  }, [loaded, readDuration])

  const pad = val => {
    let valString = val + ""
    if (valString.length < 2) {
      return "0" + valString
    } else {
      return valString
    }
  }

  const calculateBallPosition = parseFloat(
    (counter * 100) / readDuration
  ).toFixed(2)
  const moveBallTo = calculateBallPosition < 100 ? calculateBallPosition : 100

  return (
    <div
      className={`${css.read_spectrum_container} ${
        loaded ? css.open : css.closed
      }`}
    >
      <div className={css.player_container}>
        <p>{displayTime}</p>
        <div className={css.player_path}>
          <div
            className={css.player_ball}
            style={{ left: `${moveBallTo}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default ReadSpectrum
