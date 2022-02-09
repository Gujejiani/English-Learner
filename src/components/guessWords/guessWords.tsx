import React, {useState, useEffect} from 'react'
import styles from './guessWords.module.css'
import {engAlphabetToGeo} from '../../utils/engAlphToGeo'
import {speak} from '../../utils/voice'
import { FaVolumeMute } from "@react-icons/all-files/fa/FaVolumeMute";
import { ImVolumeMedium } from "@react-icons/all-files/im/ImVolumeMedium";
const GuessWords: React.FC<{word: {question: string, answer: string}, buttSettings: {prevDisable: boolean, nextDisable: boolean}, language: string,  onChangeWord: (direction: string)=>void, page: {start: number, last: number}, onChangeWords: ()=> void}>  = (props)  => {
    const [show, setShow] = useState<boolean>(false)
    const [sound, setSound] = useState<boolean>(true)
    const [spoken, setSpoken] = useState<string>('');
    useEffect(()=>{
        let timeOut: any
        if(props.language !=='Geo' && sound){
           timeOut = setTimeout(()=>{
                setSpoken(props.word.question)
                if(spoken !==props.word.question){
                    speak(props.word.question)
                }
              
            }, 1000)
        }
      return ()=> clearTimeout(timeOut)
    }, [props.language,props.word.question, sound, spoken])




    const showHandler = ()=>{
        setShow((current)=>{
            return !current
        })
       
        if(props.language ==='Geo' && !show && sound){
            speak(props.word.answer)
        }
       
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

    const soundHandler = ()=>{
        setSound(!sound)
    }

    return <div className={styles.card} >

    <div onClick={soundHandler} className={styles.sound}>
      {sound? <ImVolumeMedium className={styles.s}  width={'50px'} />: <FaVolumeMute className={styles.s}  />}
    </div>
   

         <span className={styles.count} >({props.page.start}/{props.page.last})</span>
        <div className={styles.card__question} >
            <label  className={styles.card__title} >Guess Word</label>
            <label  className={styles.card__word} >{ props.language === 'Geo' ?  engAlphabetToGeo(props.word.question): props.word.question }</label>
        </div>
        <div className={styles.card__answer} >
        <label onClick={showHandler} className={`${styles.card__translate} ${show?  styles.card__show: ''}`} >  {  props.language === 'Geo' ?  props.word.answer:  engAlphabetToGeo(props.word.answer) }</label>
    
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