import React from 'react'
import { FaVolumeMute } from "@react-icons/all-files/fa/FaVolumeMute";
import { ImVolumeMedium } from "@react-icons/all-files/im/ImVolumeMedium";
import { PropsFn } from '../../models';
import styles from './sound.module.css'

const Sound: React.FC<{soundClicked: PropsFn, sound: boolean}> = (props)=>{

  
    return  ( <div onClick={props.soundClicked} className={styles.sound}>
    {props.sound? <ImVolumeMedium className={styles.sound}  width={'50px'} />: <FaVolumeMute className={styles.sound}  />}
  </div>)
}




export default Sound