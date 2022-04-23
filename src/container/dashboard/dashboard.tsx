import React, {useState, useEffect} from 'react'
import styles from './dashboard.module.css'
import {engAlphabetToGeo} from '../../utils/engAlphToGeo'
import {speak} from '../../utils/voice'
import Controller from '../../components/wordsNavController/controller';
import Sound from '../../components/sound/sound.module';
import { LangMode, Move } from '../../models';
import Question from '../../components/question/question';
import LessonChooser from "../../components/lessonChooser/lessonChooser";
const Dashboard: React.FC<{lesson: string,word: {question: string, answer: string}, buttSettings: {prevDisable: boolean, nextDisable: boolean}, language: string,  onChangeWord: (direction: string)=>void, page: {start: number, last: number}, onChangeWords: ()=> void}>  = (props)  => {
    const [show, setShow] = useState<boolean>(false)
    const [sound, setSound] = useState<boolean>(true)
    const [spoken, setSpoken] = useState<string>('');
    useEffect(()=>{
        /**
         * @description to  not speak every word when user changes word fast
         */
        let timeOut: NodeJS.Timeout 
        if(props.language !== LangMode.GEO && sound){
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
       
        if(props.language ===LangMode.GEO && !show && sound){
            speak(props.word.answer)
        }
       
    }
 

    const changeHandler =(direction: string): any=>{
        setShow(false)
        props.onChangeWord(direction)
    }

    const soundHandler = ()=>{
        setSound((prev)=>{
            return !prev
        })
    }

    return <div className={styles.card} >
      <div  className={styles.card__book} >  < LessonChooser/></div>
        <Sound sound={sound} soundClicked={soundHandler} />
   

         <span className={styles.count} >({props.page.start}/{props.page.last})</span>
         <Question lesson={props.lesson} >{  props.language === LangMode.GEO ?  engAlphabetToGeo(props.word.question): props.word.question }</Question>
        
        <div className={styles.card__answer} >
        <label onClick={showHandler} className={`${styles.card__translate} ${show?  styles.card__show: ''}`} >  {  props.language === LangMode.GEO ?  props.word.answer:  engAlphabetToGeo(props.word.answer) }</label>
    
        <Controller buttSettings={props.buttSettings} showClicked={showHandler} prev={()=>changeHandler(Move.PREV)} next={()=>changeHandler(Move.NEXT)}changeWords={props.onChangeWords}  />
            
        </div>

    
    </div>


}


export default Dashboard