import React from 'react';
import * as css from './pill.styles.module.css';

const Pill = ({ text, pillHasBeenClicked, selected }) => {
  const getCode = (string) => {
    const removeHash = string.replace('#', '');
    let values = [];
    for (let i = 0; i < removeHash.length; i++) {
      let maxIndex = 0;
      let val = '';
      while (maxIndex % 2 === 0) {
        val += removeHash.charCodeAt(i);
        maxIndex++;
      }
      values.push(val);
    }
    const total = values.reduce((acc, curr) => acc + curr, 0) / 255;
    return Math.ceil(total);
  };
  const getBackgroundColor = (string) => {
    const colorCount = getCode(string);
    return `hsl(${colorCount}, 80%,${85 + 10 / 1.4}%)`;
  };

  const isClickable = typeof pillHasBeenClicked === 'function';

  const handleSelectingTag = () => {
    pillHasBeenClicked(text);
  };

  return (
    <button
      className={css.pill}
      onClick={() => isClickable && handleSelectingTag()}
      style={{
        background: getBackgroundColor(text),
        filter: 'hue-rotate(90deg)',
      }}
    >
      <p>
        {text}{' '}
        {isClickable ? selected && <span class={css.selected}>*</span> : null}
      </p>
    </button>
  );
};

export default Pill;
