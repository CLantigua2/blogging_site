import React from 'react';
import * as css from './card.styles.module.css';

const Card = ({ children, padding, maxWidth }) => {
  const handleStyling = () => {
    switch (padding) {
      case 'medium':
        return css.medium;
      case 'large':
        return css.large;
      default:
        return css.small;
    }
  };
  return (
    <div
      className={`${css.container} ${handleStyling()}`}
      style={maxWidth ? { maxWidth } : null}
    >
      {children}
    </div>
  );
};

export default Card;
