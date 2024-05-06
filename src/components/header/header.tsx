import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";

import styles from "./header.module.css";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import "./styles.css";
const Header: React.FC = () => {
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [show, setShow] = useState<boolean>();

  const [countAnimation, setCountAnimation] = useState<boolean>(false)
  const [countAnimationOnLearnedWords, setCountAnimationOnLearnedWords] = useState<boolean>(false)
  const vocabulary = useSelector((state: RootState) => state.vocabulary.vocabulary);
  const count = useSelector(
    (state: RootState) => state.vocabulary.hardWords.length,
  );

  const learnedWordsCount = useSelector(
    (state: RootState) => state.vocabulary.learnedWords.length,
  );
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = () => {
    setShow(!show);
  };

 

  useEffect(()=>{
        console.log('count changed')
        setCountAnimation(true)
      const timer =  setTimeout(()=>{
          setCountAnimation(false)
        }, 5000)
        return () => clearTimeout(timer)
  }, [count])
  useEffect(()=>{
    console.log('count changed')
    setCountAnimationOnLearnedWords(true)
  const timer =  setTimeout(()=>{
      setCountAnimationOnLearnedWords(false)
    }, 5000)
    return () => clearTimeout(timer)
}, [learnedWordsCount])
  const navLinks = () => (
    <ul className={styles.nav__ul__mobile}>
     { vocabulary.length ?<li className={styles.ul__list__mobile}>
        <NavLink activeClassName={styles.active} to="/dashboard">
          Dashboard
        </NavLink>
      </li>: ''}
      <li className={styles.ul__list__mobile}>
        <NavLink activeClassName={styles.active} exact to="/form">
          Upload PDF
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
          <span className={`${styles.hard__words__count} ${countAnimation? styles.hard__words__count__animation: ''} `}>{count}</span>{" "}
        </NavLink>
      </li>
      <li className={styles.ul__list__mobile}>
        <NavLink
          activeClassName={`${styles.active} ${styles.hard__words}`}
          to="learned-words"
        >
          Learned Words
        </NavLink>
        <span className={`${styles.hard__words__count} ${styles.hard__words__count_learned} ${countAnimationOnLearnedWords? styles.hard__words__count__learned : ''} `}>{learnedWordsCount}</span>{" "}

      </li>
    </ul>
  );

  return (
    <>
      {screenWidth <= 480 ? (
        <div className="menu-wrapper">
          <button onClick={toggleDrawer} className="hamburger">
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>

          <NavLink className={styles.header__img} to="/dashboard">
            EL
          </NavLink>

          {/* </button> */}
          <Drawer anchor="left" open={show} onClose={toggleDrawer}>
            {navLinks()}
          </Drawer>
        </div>
      ) : (
        <header className={styles.header}>
          <NavLink className={styles.header__img} to="/dashboard">
            EL
          </NavLink>

          <nav className={styles.header__nav}>
            <ul className={styles.nav__ul}>
              <li className={styles.ul__list}>
                {" "}
               { vocabulary.length? <NavLink activeClassName={styles.active} to="/dashboard">
                  Dashboard
                </NavLink>: ''}{" "}
              </li>

              <li className={styles.ul__list}>
                {" "}
                <NavLink
                  activeClassName={`${styles.active} ${styles.hard__words}`}
                  to="hard-words"
                >
                  Hard Words
                </NavLink>{" "}
                <span className={`${styles.hard__words__count} ${countAnimation? styles.hard__words__count__animation: ''} `}>{count}</span>{" "}
              </li>
              <li className={styles.ul__list}>
                {" "}
                <NavLink
                  activeClassName={`${styles.active} ${styles.hard__wordsx}`}
                  to="learned-words"
                >
                  Learned Words

                </NavLink>{" "}
                <span className={`${styles.hard__words__count} ${styles.hard__words__count_learned} ${countAnimationOnLearnedWords? styles.hard__words__count__learned : ''} `}>{learnedWordsCount}</span>{" "}

              </li>
            </ul>
            <ul style={{ display: "flex" }}>
              <li style={{ marginRight: "30px" }} className={styles.ul__list}>
                {" "}
                <NavLink activeClassName={styles.active} exact to="/form">
                  Upload PDF
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
