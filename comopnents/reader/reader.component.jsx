import React, { useState, useEffect } from 'react';
import * as css from './reader.styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import AnimatedWave from '../animated-wave';
import ReadSpectrum from '../read-spectrum';
import { speak } from '../../utils/speech-synth';

const Reader = ({ textToRead }) => {
  const [text, setText] = useState('');
  const [playStatus, setPlayStatus] = useState('_play');

  // remove all HTML tags from text sample
  useEffect(() => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = textToRead;
    setText(tmp.textContent || tmp.innerText || '');
  }, [textToRead]);

  const handleClick = () => {
    // NOTE: will cause an error if this cancel isn't here
    speechSynthesis.cancel();
    if (typeof window !== 'undefined') {
      setPlayStatus((prev) => {
        if (prev === '_play') {
          speak(text, setPlayStatus, window.speechSynthesis);
          return '_pause';
        }
        return '_play';
      });
    }
    return '_play';
  };

  return (
    <div className={css.loader}>
      <div className={css.wrapper}>
        <div
          className={css.player_main_control}
          onClick={() => handleClick()}
          onKeyPress={() => handleClick()}
          aria-hidden="true"
        >
          <div className={css.control_play_pause}>
            <div className={`control_icon_${playStatus}`}>
              {playStatus === '_play' ? (
                <FontAwesomeIcon icon={faPlay} />
              ) : (
                <AnimatedWave />
              )}
            </div>
          </div>
        </div>
        <ReadSpectrum loaded={playStatus === '_pause'} />
      </div>
    </div>
  );
};

export default Reader;
