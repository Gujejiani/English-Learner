import React from 'react'
import styles from './question.module.css'

const Question: React.FC  = (props)=> {
    return (
        <div className={styles.card__question} >
        <label  className={styles.card__title} >Guess Word</label>
        <label  className={styles.card__word} >{props.children}</label>
    </div>
    )
}


export default Question