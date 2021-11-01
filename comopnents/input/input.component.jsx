import React from 'react';
import * as css from './styles.module.css';

const Input = ({ label, type, name, id }) => {
  return (
    <div className={css.input_container}>
      <label>{label}</label>
      <input className={css.input} type={type} name={name} id={id} />
    </div>
  );
};

export default Input;
