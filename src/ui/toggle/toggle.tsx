import styles from './toggle.module.css'
import React,{useState} from 'react'
const Toggle: React.FC<{onToggled: (toggled: boolean)=>  void, toggle: boolean}> = (props) => {
    const [toggle, setToggle] = useState<boolean>(true)


    const clickHandler = ()=>{
        setToggle((isToggled: boolean)=>{
            return !isToggled
        })
        props.onToggled(!toggle)
    }

    return <div onClick={clickHandler} className={styles.toggle} >
        <span className={styles.eng} >GEO</span>
        <span className={styles.eng} >ENG</span>
        <span className={`${styles.toggle__box} ${!props.toggle ? styles.toggled: ''}`} >
          
        </span>
    </div>
}

export default Toggle