import React from 'react';
import { Link, useLocation } from "react-router-dom";
import styles from './Navbar.module.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <header className={styles.nav}>
      <Link to="/" className={location.pathname === "/" ? styles.selected : styles.notselected}>
        <img src={location.pathname === "/" || location.pathname === "/create-card" ? `/assets/house-door-fill.svg` : `/assets/house-door.svg`} />
      </Link>
      <Link to="/analytics" className={location.pathname === "/analytics" ? styles.selected : styles.notselected}>
        <img src={location.pathname === "/analytics" ? `/assets/bar-chart-line-fill.svg` : `/assets/bar-chart-line.svg`} />
      </Link>
      <Link to="/tree" className={location.pathname === "/tree" ? styles.selected : styles.notselected}>
        <img src={location.pathname === "/tree" ? `/assets/droplet-fill.svg` : `/assets/droplet.svg`} />
      </Link>
      <Link to="/mypage" className={location.pathname === "/mypage" || location.pathname === "/update-card" ? styles.selected : styles.notselected}>
        <img src={location.pathname === "/mypage" ? `/assets/person-fill.svg` : `/assets/person.svg`} />
      </Link>
    </header>
  );
};

export default Navbar;
