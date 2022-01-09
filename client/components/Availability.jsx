import React from 'react';
import styles from '../css/styles.css';

const Availability = ({ onlineInv }) => {
  const stock = ['Available now', 'Backorders accepted, will ship by October 18, 2023'];
  return (
    <div className={styles.availability}>{stock[onlineInv]}</div>
  );
};

export default Availability;
