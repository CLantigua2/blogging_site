import { motion } from 'framer-motion';
import * as css from './menu-items.styles.module.css';
import { Link } from 'gatsby';

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MenuItem = ({ i, to, text, toggleOpen }) => {
  const handleClick = () => {
    if (typeof toggleOpen !== undefined) {
      toggleOpen();
    }
  };
  return (
    <motion.li
      className={css.li}
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to={to} onClick={() => handleClick()}>
        {text}
      </Link>
    </motion.li>
  );
};

export default MenuItem;
