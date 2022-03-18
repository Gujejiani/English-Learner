import React from "react";
import styles from './controller.module.css'
import {ButtonSettings, PropsFn} from '../../models'

export const Controller:React.FC<{buttSettings:  ButtonSettings, showClicked: PropsFn, next: PropsFn, prev:PropsFn, changeWords: PropsFn}> =(props)=>{
    return(
        <React.Fragment>
          <div  className={styles.nav} >
                <button disabled={props.buttSettings.prevDisable} onClick={props.prev} className={`${styles.nav__button} ${props.buttSettings.prevDisable? styles.disable: ''}` } >{ '<Prev'}</button>
                <button onClick={props.showClicked} className={ `${styles.nav__button} ${styles.button__show}`} >Show</button>
                <button disabled={props.buttSettings.nextDisable} onClick={props.next} className={`${styles.nav__button} ${props.buttSettings.nextDisable? styles.disable: ''}`} >{ 'Next>'}</button>
               
            </div>
            <button onClick={props.changeWords} className={ `${styles.nav__button} ${styles.button__show} ${styles.nav__insert}`} >Change Words</button>
        </React.Fragment>
       
    )
}


export default Controller