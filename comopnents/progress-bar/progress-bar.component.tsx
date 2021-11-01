import * as css from './progress-bar.styles.module.css';

const PropgressBar = ({ value }) => {
  return (
    <div className={css.container}>
      <div className={`${value >= 1 ? css.level_one : ''}`}></div>
      <div className={`${value >= 2 ? css.level_two : ''}`}></div>
      <div className={`${value >= 3 ? css.level_three : ''}`}></div>
      <div className={`${value >= 4 ? css.level_four : ''}`}></div>
      <div className={`${value >= 5 ? css.level_five : ''}`}></div>
      <div className={`${value === 6 ? css.level_six : ''} `}></div>
    </div>
  );
};

export default PropgressBar;
