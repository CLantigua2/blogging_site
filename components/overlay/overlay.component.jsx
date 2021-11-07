import React, { useRef } from 'react';
import * as css from './overlay.styles.module.css';
import { motion, useCycle } from 'framer-motion';
import { useDimensions } from '../../hooks/';
import { Navigation } from '../navigation/';
import { MenuToggle } from '../menu-toggle/';

const overlayStyle = {
  open: (height = 1000) => ({
    clipPath: `circle(${800 * 2 + 200}px at 40px 40px)`,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(0px at 40px 40px)',
    opacity: 0,
    transition: {
      delay: 0.2,
      type: 'spring',
      stiffness: 300,
      damping: 100,
    },
  },
};

const Overlay = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.div
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      ref={containerRef}
      className={css.nav}
    >
      <motion.div className={css.background} variants={overlayStyle}>
        <Navigation toggle={() => toggleOpen()} />
      </motion.div>
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.div>
  );
};

export default Overlay;
