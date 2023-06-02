import React, {useState, useEffect} from 'react'
import styles from './dashboard.module.css'
import {engAlphabetToGeo} from '../../utils/engAlphToGeo'
import {speak} from '../../utils/voice'
import Controller from '../wordsNavController/controller';
import Sound from '../sound/sound.module';
import { LangMode, Move } from '../../models';
import Question from '../question/question';
import LessonChooser from "../lessonChooser/lessonChooser";
import { vocabularyActions } from '../../store/vocabulary-slice';
import DataModifier from '../../utils/DataModifier';
import { buttonController } from '../../utils/buttonController';
import { useSelector, useDispatch } from 'react-redux';
import  { RootState } from '../../store/reducer';
import Favorites from '../favourites/favourites';
import { determineIfSelectedAsHardWord } from '../../utils/utils';
import { useHistory } from 'react-router-dom';
import MyInput from '../../ui/input/input';
import Animation from '../../ui/animation/animation';

const Dashboard: React.FC<{vocabulary: string[], vocabularyQuestion: {
  question: string;
  answer: string;
}, hardWords?: boolean, children?: any}>  = (props)  => {
    const [show, setShow] = useState<boolean>(false)
    const [sound, setSound] = useState<boolean>(true)
    const [spoken, setSpoken] = useState<string>('');
    const history = useHistory();

    const [hintIndex, setHintIndex]=useState(0)
    const [showLessons, setShowLessons] = useState<boolean>(false)

    const [wordChanged, setWordChanged] = useState(0)


    const language = useSelector((state: RootState)=> state.settings.language)
    const dispatch = useDispatch()

  const hardWords = useSelector((state: RootState)=> state.vocabulary.hardWords)


  
   const lesson = useSelector((state: RootState)=> state.vocabulary.lessonTitle)
  
  
    const [index,  setIndex] = useState<number>(0)
    const [buttons,  setButtons] = useState<{prevDisable: boolean, nextDisable: boolean}>({prevDisable: true, nextDisable: false})
    useEffect(() => {
      setIndex(0)
      setButtons({
        prevDisable: true,
        nextDisable: false
      })
      const vocabulary = localStorage.getItem('vocabulary')? JSON.parse(localStorage.getItem('vocabulary') as string): undefined

        if(!props.vocabulary.length && !vocabulary){
          history.push('/')
         }
    
      
    }, [props.vocabulary, history]);

   
     
  
    const changeWord  = (direction: string, hardWordRemoved?: boolean)=>{
      setWordChanged(prev=>{
        return prev = prev+1
      })
      setHintIndex(0)
      let currentIndex: number;
      if(direction  ===Move.NEXT){
      currentIndex = buttonController({index, next: true, words: props.vocabulary}, buttons, setButtons)
      }else{
        currentIndex = buttonController({index: hardWordRemoved? index-1: index, next: false, words: props.vocabulary}, buttons, setButtons)
      }
      let currentWord =DataModifier.getWord(props.vocabulary, currentIndex)
    
    
      let questIndex = language===LangMode.GEO? 1: 0
      let answerIndex =  language===LangMode.GEO? 0: 1
      if(!props?.hardWords){
        dispatch(vocabularyActions.changeWord({
          question: currentWord[questIndex],
          answer: currentWord[answerIndex],
        }))
      }else{
        dispatch(vocabularyActions.changeHardWord({
          question: currentWord[questIndex],
          answer: currentWord[answerIndex],
        }))
      }
     

     
  
      setIndex(currentIndex)
    }
  
    const changeWordsHandler =()=>{
      setIndex(0)
      setButtons({nextDisable: false, prevDisable: true})
      localStorage.removeItem('data')
      dispatch(vocabularyActions.removeVocabulary())
    }





    const showLessonsHandler =()=>{
      setShowLessons(prev=> !prev)
    }












    useEffect(()=>{
        
        /**
         * @description to  not speak every word when user changes word fast
         */
        let timeOut: NodeJS.Timeout 
        if(language !== LangMode.GEO && sound){
           timeOut = setTimeout(()=>{
                setSpoken(props.vocabularyQuestion.question)
                if(spoken !==props.vocabularyQuestion.question){
                    speak(props.vocabularyQuestion.question)
                }
              
            }, 1000)
        }
      return ()=> clearTimeout(timeOut)
    }, [language,props.vocabularyQuestion.question, sound, spoken])




    const showHandler = ()=>{
        setShow((current)=>{
            return !current
        })
        setHintIndex(0)
        if(language ===LangMode.GEO && !show && sound){
            speak(props.vocabularyQuestion.answer)
        }
       
    }
 

    const changeHandler =(direction: string, hardWordRemoved?: boolean): any=>{
        setShow(false)
        changeWord(direction, hardWordRemoved)
    }

    const soundHandler = ()=>{
        setSound((prev)=>{
            return !prev
        })
    }

  


const hardWordAdded  =()=>{
  if(props.hardWords){
    const hardWordRemoved = props.vocabulary.findIndex(word=> word.includes(props.vocabularyQuestion.question))
   
    if(hardWordRemoved !== -1 && props.vocabulary.length>1){
      if(index===0){
        changeHandler(Move.NEXT)
      }else {
        changeHandler(Move.PREV)
      }
     
    }
  }
  dispatch(vocabularyActions.hardWordAdded(props.vocabularyQuestion.question))

 
}

function keyDownHandler(event: any){
  
    switch(event.key){
      case 'ArrowRight':
        if(!buttons.nextDisable){
           changeHandler(Move.NEXT);
        }
        
        break;
      case 'ArrowLeft': 
      if(!buttons.prevDisable){
         changeHandler(Move.PREV);
      }
        break;
      case 'Enter':
        event.preventDefault()
       showHandler()
        break;
      default:
        break;
    }
    if(event?.keyCode ===32){
      // event.preventDefault()
      // showHandler()
    }
}
function removeParentheses(text: string) {
  // Define a regular expression pattern to match the content inside parentheses
  var pattern = /\([^)]*\)/g;

  // Use the replace() method to replace the matched pattern with an empty string
  var cleanedText = text.replace(pattern, "");

  return cleanedText;
}

const  handleHintShow=()=>{
  setHintIndex((prev)=>{

    return prev +1
  
})
}

    return <div onKeyDown={keyDownHandler} className={styles.card} >
      {!props.hardWords ?<div  className={styles.card__book} >  <  LessonChooser  showLessons={showLessons} showLessonsClicked={showLessonsHandler} /></div>: ''}
        <Sound sound={sound} soundClicked={soundHandler} />
   
   
   <Animation wordChangeCount={wordChanged} onShowHint={handleHintShow}  />

         <span className={styles.count} >({index+1}/{props.vocabulary.length})</span>
         <Question lesson={props.hardWords?'Hard Words': lesson} >{  language === LangMode.GEO ?  engAlphabetToGeo(props.vocabularyQuestion.question): props.vocabularyQuestion.question }</Question>
        
        <div className={styles.card__answer} >
        <Favorites hardWord={determineIfSelectedAsHardWord(hardWords, props.vocabularyQuestion.answer)} addedToHardWords={hardWordAdded}  />

{language ===LangMode.ENG?<label onClick={showHandler} className={`${styles.card__translate}  ${show?  styles.card__show: styles.card__show__hide}`} > {show? '':"just place holder stuff"} {  show?  engAlphabetToGeo(props.vocabularyQuestion.answer): '' }</label>


:<MyInput hintIndex={hintIndex} onSuccess={()=>changeHandler(Move.NEXT)} playSound={sound} wordChangeCount ={wordChanged} showAnswer={showHandler} show={show} answerWord={removeParentheses(props.vocabularyQuestion.answer?.replace(/\s{2,}/g, " ").trim())} />}
<Controller buttSettings={buttons} showClicked={showHandler} prev={()=>changeHandler(Move.PREV)} next={()=>changeHandler(Move.NEXT)}changeWords={showLessonsHandler}  />
            
        </div>

       
    </div>


}


export default Dashboard