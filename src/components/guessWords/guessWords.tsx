import React, {useState} from 'react'
import styles from './guessWords.module.css'
import {engAlphabetToGeo} from '../../utils/engAlphToGeo'

const GuessWords: React.FC<{word: {question: string, answer: string}, buttSettings: {prevDisable: boolean, nextDisable: boolean}, language: string,  onChangeWord: (direction: string)=>void, page: {start: number, last: number}, onChangeWords: ()=> void}>  = (props)  => {
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
         <span className={styles.count} >({props.page.start}/{props.page.last})</span>
        <div className={styles.card__question} >
            <label  className={styles.card__title} >Guess Word</label>
            <label  className={styles.card__word} >{ props.language === 'Geo' ?  engAlphabetToGeo(props.word.question): props.word.question }</label>
        </div>
        <div className={styles.card__answer} >
        <label onClick={showHandler} className={`${styles.card__translate} ${show?  styles.card__show: ''}`} >  {  props.language === 'Geo' ?  props.word.answer: engAlphabetToGeo(props.word.answer) }</label>
    
        <div  className={styles.card__nav} >
                <button disabled={props.buttSettings.prevDisable} onClick={prevHandler} className={`${styles.card__button} ${props.buttSettings.prevDisable? styles.disable: ''}` } >{ '<Prev'}</button>
                <button onClick={showHandler} className={ `${styles.card__button} ${styles.button__show}`} >Show</button>
                <button disabled={props.buttSettings.nextDisable} onClick={nextHandler} className={`${styles.card__button} ${props.buttSettings.nextDisable? styles.disable: ''}`} >{ 'Next>'}</button>
               
             </div>
             <button onClick={props.onChangeWords} className={ `${styles.card__button} ${styles.button__show} ${styles.card__insert}`} >Change Words</button>
        </div>

    
    </div>


}


export default GuessWords