import React, {useState, useEffect} from 'react'
import styles from './dashboard.module.css'
import {engAlphabetToGeo} from '../../utils/engAlphToGeo'
import {speak} from '../../utils/voice'
import Controller from '../../components/wordsNavController/controller';
import Sound from '../../components/sound/sound.module';
import { LangMode, Move } from '../../models';
import Question from '../../components/question/question';
import LessonChooser from "../../components/lessonChooser/lessonChooser";
import { vocabularyActions } from '../../store/vocabulary-slice';
import DataModifier from '../../utils/DataModifier';
import { buttonController } from '../../utils/buttonController';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/reducer';
const Dashboard: React.FC  = (props)  => {
    const [show, setShow] = useState<boolean>(false)
    const [sound, setSound] = useState<boolean>(true)
    const [spoken, setSpoken] = useState<string>('');


    const vocabulary = useSelector((state: RootState)=> state.vocabulary.vocabulary)
    const vocabularyByStages = useSelector((state: RootState)=> state.vocabulary.vocabularyByStages)
    const vocabularyQuestion=  useSelector((state: RootState)=> state.vocabulary.words) //useState<{words: Array<string>,  language: string}>({words: [], language: 'Eng'})
    const language = useSelector((state: RootState)=> state.settings.language)
    const dispatch = useDispatch()
  
   const lesson = useSelector((state: RootState)=> state.vocabulary.lessonTitle)
  
  
  
    const [index,  setIndex] = useState<number>(0)
    const [buttons,  setButtons] = useState<{prevDisable: boolean, nextDisable: boolean}>({prevDisable: true, nextDisable: false})
    useEffect(() => {
      setIndex(0)
      setButtons({
        prevDisable: true,
        nextDisable: false
      })
    }, [vocabularyByStages]);
  
  
    const changeWord  = (direction: string)=>{
  
      let currentIndex: number;
      if(direction  ===Move.NEXT){
      currentIndex = buttonController({index, next: true, words: !vocabularyByStages.length? vocabulary: vocabularyByStages}, buttons, setButtons)
      }else{
        currentIndex = buttonController({index, next: false, words:!vocabularyByStages.length? vocabulary: vocabularyByStages}, buttons, setButtons)
      }
      let currentWord =DataModifier.getWord(!vocabularyByStages.length? vocabulary: vocabularyByStages, currentIndex)
    
    
      let questIndex = language===LangMode.GEO? 1: 0
      let answerIndex =  language===LangMode.GEO? 0: 1
  
      dispatch(vocabularyActions.changeWord({
        question: currentWord[questIndex],
        answer: currentWord[answerIndex],
      }))
  
      setIndex(currentIndex)
    }
  
    const changeWordsHandler =()=>{
      setIndex(0)
      setButtons({nextDisable: false, prevDisable: true})
      localStorage.removeItem('data')
      dispatch(vocabularyActions.removeVocabulary())
    }


















    useEffect(()=>{
        
        /**
         * @description to  not speak every word when user changes word fast
         */
        let timeOut: NodeJS.Timeout 
        if(language !== LangMode.GEO && sound){
           timeOut = setTimeout(()=>{
                setSpoken(vocabularyQuestion.question)
                if(spoken !==vocabularyQuestion.question){
                    speak(vocabularyQuestion.question)
                }
              
            }, 1000)
        }
      return ()=> clearTimeout(timeOut)
    }, [language,vocabularyQuestion.question, sound, spoken])




    const showHandler = ()=>{
        setShow((current)=>{
            return !current
        })
       
        if(language ===LangMode.GEO && !show && sound){
            speak(vocabularyQuestion.answer)
        }
       
    }
 

    const changeHandler =(direction: string): any=>{
        setShow(false)
        changeWord(direction)
    }

    const soundHandler = ()=>{
        setSound((prev)=>{
            return !prev
        })
    }







    return <div className={styles.card} >
      <div  className={styles.card__book} >  < LessonChooser/></div>
        <Sound sound={sound} soundClicked={soundHandler} />
   

         <span className={styles.count} >({index+1}/{!vocabularyByStages.length? 
      vocabulary.length: vocabularyByStages.length})</span>
         <Question lesson={lesson} >{  language === LangMode.GEO ?  engAlphabetToGeo(vocabularyQuestion.question): vocabularyQuestion.question }</Question>
        
        <div className={styles.card__answer} >
        <label onClick={showHandler} className={`${styles.card__translate} ${show?  styles.card__show: ''}`} >  {  language === LangMode.GEO ?  vocabularyQuestion.answer:  engAlphabetToGeo(vocabularyQuestion.answer) }</label>
    
        <Controller buttSettings={buttons} showClicked={showHandler} prev={()=>changeHandler(Move.PREV)} next={()=>changeHandler(Move.NEXT)}changeWords={changeWordsHandler}  />
            
        </div>

    
    </div>


}


export default Dashboard