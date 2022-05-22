import React from "react";
import styles from './controller.module.css'
import {ButtonSettings, PropsFn, Move} from '../../models'
import Button  from '../../ui/button/button';

const Controller:React.FC<{buttSettings:  ButtonSettings, showClicked: PropsFn, next: PropsFn, prev:PropsFn, changeWords: PropsFn}> =(props)=>{
    return(
        <React.Fragment>
          <div  className={styles.nav} >
            <Button onClick={props.prev} directionButton={true} disabled={props.buttSettings.prevDisable} >{`<${Move.PREV}`}</Button>
            <Button onClick={props.showClicked} show={true} >Show</Button>
            <Button onClick={props.next} directionButton={true} disabled={props.buttSettings.nextDisable} >{ `${Move.NEXT}>`}</Button>
            </div>
            <Button onClick={props.changeWords} insert={true}  >Change Lesson</Button>
           
        </React.Fragment>
       
    )
}


export default Controller