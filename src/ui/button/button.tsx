import React from 'react';
import {PropsFn } from '../../models';
import styles from './button.module.css';


const Button:React.FC<{onClick: PropsFn, disabled?: boolean, show?: boolean, insert?: boolean,  directionButton?: boolean,  hardWords?: boolean}> = (props)=>{

    return (
        <React.Fragment>
                 <button  disabled={props.disabled} onClick={props.onClick} className={`${styles.nav__button} ${props.disabled? styles.disable: ''} ${props.show? styles.button__show:''} ${props.insert? styles.nav__insert: '' }   ${(props.directionButton || props.show) ? styles.button__direction: ''} ${props.hardWords? styles.hard__words: ''} ` } >{props.children}</button>
        
        </React.Fragment>
    )

}



export default Button