import React from 'react';
import styles from './header.module.css'

import Logo from '../../assets/icons8-learn-64.png'
import {NavLink} from 'react-router-dom'
const Header: React.FC = ()=>{ 
return <header className={styles.header} >
    <img className={styles.header__img}  height={'35px'} src={Logo} alt="Logo" />
        <nav className={styles.header__nav} >
            <ul className={styles.nav__ul} >
                <li className={styles.ul__list} > <NavLink activeClassName={styles.active}  to="welcome">Welcome</NavLink> </li>
                <li className={styles.ul__list} > <NavLink activeClassName={styles.active}  to="dashboard">Dashboard</NavLink> </li>
                <li className={styles.ul__list} > <NavLink activeClassName={styles.active}  to="form">Form</NavLink> </li>
                <li className={styles.ul__list} > <NavLink activeClassName={styles.active}  to="about">About</NavLink> </li>
            </ul>
        </nav>
</header>
}

export default Header