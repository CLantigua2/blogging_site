import React, { useState, useEffect } from "react"
import * as css from "./styles.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay"
import AnimatedWave from "../../common/animated-wave"
import SpeechSynth from "../../utils/speech-synth"

const speechSynthesis = new SpeechSynth()

const Reader = ({ textToRead }) => {
  const [playStatus, setPlayStatus] = useState("_play")
  const [playing, setPlaying] = useState(false)

  // useEffect(() => {
  //   if (window) {
  //     setPlaying(window.speechSynthesis.speaking)
  //   }
  // }, [])

  useEffect(() => {
    if (typeof window !== undefined) {
      speechSynthesis.loadProps({
        text: textToRead,
        voice: 2,
        pitch: 1,
        resume: playStatus === "_pause",
        lang: "en-US",
      })
    }
  }, [playStatus, textToRead])

  const handleClick = () => {
    speechSynthesis.speak()
    // setPlayStatus(prev => {
    //   if (prev === "_play") {
    //     if (!playing) {
    //       speechSynthesis.speak()
    //     } else {
    //       speechSynthesis.resume()
    //     }
    //     return "_pause"
    //   }
    //   speechSynthesis.pause()
    //   return "_play"
    // })
  }

  useEffect(() => {
    if (playStatus === "_pause") {
    }
  }, [playStatus, textToRead])

  return (
    <div className={css.loader}>
      <div className={css.wrapper}>
        <div
          className={css.player_main_control}
          onClick={() => handleClick()}
          onKeyPress={() => handleClick}
          aria-hidden="true"
        >
          <div className={css.control_play_pause}>
            <div className={`control_icon_${playStatus}`}>
              {playStatus === "_play" ? (
                <FontAwesomeIcon icon={faPlay} />
              ) : (
                <AnimatedWave />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reader
