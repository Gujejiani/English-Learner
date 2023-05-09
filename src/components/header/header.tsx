import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";

import styles from "./header.module.css";

import Logo from "../../assets/icons8-learn-64.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import './styles.css';
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
        Upload Form
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
        <div className="menu-wrapper" >
          <button onClick={toggleDrawer}  className="hamburger">
  <span className="hamburger-box">
    <span className="hamburger-inner"></span>
  </span>
</button>

          
           <NavLink  className={styles.header__img} to="/dashboard"  >EL</NavLink>

          {/* </button> */}
          <Drawer   anchor="left" open={show} onClose={toggleDrawer}>
            {navLinks()}
          </Drawer>
        </div>
      ) : (
        <header className={styles.header}>
         
          <NavLink  className={styles.header__img} to="/dashboard"  >EL</NavLink>
          
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
                <NavLink
                  activeClassName={`${styles.active} ${styles.hard__words}`}
                  to="hard-words"
                >
                  Hard Words
                </NavLink>{" "}
                <span className={styles.hard__words__count}>{count}</span>{" "}
              </li>
            </ul>
            <ul  style={{display: 'flex'}}>
            <li style={{'marginRight': '30px'}} className={styles.ul__list}>
                {" "}
                <NavLink activeClassName={styles.active} exact to="/">
                 Upload Form
                </NavLink>{" "}
              </li>
              <li className={styles.ul__list}>
                {" "}
                <NavLink activeClassName={styles.active} to="/about">
                  About
                </NavLink>{" "}
              </li>
              </ul>
          </nav>
        </header>
      )}
    </>
  );
};

export default Header;
