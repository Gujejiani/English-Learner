import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";

import styles from "./header.module.css";

import Logo from "../../assets/icons8-learn-64.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
const Header: React.FC = () => {
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [show, setShow] = useState<boolean>();

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = () => {
    setShow(!show);
  };

  const count = useSelector(
    (state: RootState) => state.vocabulary.hardWords.length
  );

  const navLinks = () => (
    <ul className={styles.nav__ul__mobile}>
      <li className={styles.ul__list__mobile}>
        <NavLink activeClassName={styles.active} to="/dashboard">
          Dashboard
        </NavLink>
      </li>
      <li className={styles.ul__list__mobile}>
        <NavLink activeClassName={styles.active} exact to="/">
          Form
        </NavLink>
      </li>
      <li className={styles.ul__list__mobile}>
        <NavLink activeClassName={styles.active} to="/about">
          About
        </NavLink>
      </li>
      <li className={styles.ul__list__mobile}>
        <NavLink
          activeClassName={`${styles.active} ${styles.hard__words}`}
          to="hard-words"
        >
          Hard Words
        </NavLink>
      </li>
    </ul>
  );

  return (
    <>
      {screenWidth <= 480 ? (
        <div>
          <button onClick={toggleDrawer} className={styles.button_nav}>
            <img
              className={styles.header__img}
              height={"35px"}
              src={Logo}
              alt="Logo"
            />
          </button>
          <Drawer anchor="left" open={show} onClose={toggleDrawer}>
            {navLinks()}
          </Drawer>
        </div>
      ) : (
        <header className={styles.header}>
          <img
            className={styles.header__img}
            height={"35px"}
            src={Logo}
            alt="Logo"
          />
          <nav className={styles.header__nav}>
            <ul className={styles.nav__ul}>
              <li className={styles.ul__list}>
                {" "}
                <NavLink activeClassName={styles.active} to="/dashboard">
                  Dashboard
                </NavLink>{" "}
              </li>
              <li className={styles.ul__list}>
                {" "}
                <NavLink activeClassName={styles.active} exact to="/">
                  Form
                </NavLink>{" "}
              </li>
              <li className={styles.ul__list}>
                {" "}
                <NavLink activeClassName={styles.active} to="/about">
                  About
                </NavLink>{" "}
              </li>
              <li className={styles.ul__list}>
                {" "}
                <NavLink
                  activeClassName={`${styles.active} ${styles.hard__words}`}
                  to="hard-words"
                >
                  Hard Words
                </NavLink>{" "}
                <span className={styles.hard__words__count}>{count}</span>{" "}
              </li>
            </ul>
          </nav>
        </header>
      )}
    </>
  );
};

export default Header;
