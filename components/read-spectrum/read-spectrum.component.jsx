import { useState, useEffect } from 'react';
import * as css from './read-spectrum.styles.module.css';

let totalSeconds = 0;

const ReadSpectrum = ({ loaded }) => {
  const [displayTime, setDisplayTime] = useState('00:00');

  useEffect(() => {
    if (loaded) {
      let timesRun = 0;
      let timer = setInterval(() => {
        timesRun += 1;
        ++totalSeconds;
        setDisplayTime(
          `${pad(parseInt(totalSeconds / 60, 10))}:${pad(
            parseInt(totalSeconds % 60, 10)
          )}`
        );
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setDisplayTime('00:00');
      totalSeconds = 0;
    }
  }, [loaded]);

  const pad = (val) => {
    let valString = val + '';
    if (valString.length < 2) {
      return '0' + valString;
    } else {
      return valString;
    }
  };

  return (
    <div
      className={`${css.read_spectrum_container} ${
        loaded ? css.open : css.closed
      }`}
    >
      <div className={css.player_container}>
        <p>{displayTime}</p>
      </div>
    </div>
  );
};

export default ReadSpectrum;
