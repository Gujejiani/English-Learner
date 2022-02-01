import React, {useState} from 'react'
import styles from './guessWords.module.css'
import {engAlphabetToGeo} from '../utils/engAlphToGeo'
const GuessWords: React.FC<{word: {question: string, answer: string},  onChangeWord: (direction: string)=>void}>  = (props)  => {
    const [show, setShow] = useState<boolean>(false)

    const showHandler = ()=>{
        setShow((current)=>{
            return !current
        })
    }
    const nextHandler =()=>{
        engAlphabetToGeo('maRaziidan')
        setShow(false)
        props.onChangeWord('Next')
       
    }
    const prevHandler = ()=>{
        setShow(false)
        props.onChangeWord('Prev')
      
    }
    return <div className={styles.card} >
         
        <div className={styles.card__question} >
            <label  className={styles.card__title} >Guess Word</label>
            <label  className={styles.card__word} >{ engAlphabetToGeo(props.word.question)}</label>
        </div>
        <div className={styles.card__answer} >
        <label  className={`${styles.card__translate} ${show?  styles.card__show: ''}`} >{props.word.answer}</label>

        <div  className={styles.card__nav} >
                <button onClick={prevHandler} className={styles.card__button } >{ '<Prev'}</button>
                <button onClick={showHandler} className={ `${styles.card__button} ${styles.button__show}`} >Show</button>
                <button onClick={nextHandler} className={styles.card__button} >{ 'Next>'}</button>
            
             </div>
        </div>

    
    </div>


}


export default GuessWords