'use client';

import { useState } from 'react';
import styles from './Watering.module.css';

const Watering = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={styles.wateringButton}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={isHovered ? styles.hovered : ''}>물주기</span>
    </button>
  );
};

export default Watering;