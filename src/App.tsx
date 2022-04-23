import React, {useState, useEffect} from 'react';
import './App.css';
import VocabularyForm from './components/vocabularyForm/vocabularyForm';
import Dashboard from './container/dashboard/dashboard';
import {LangMode} from './models/index'
import {buttonController} from './utils/buttonController'
import DataModifier from './utils/DataModifier'
import {useDispatch, useSelector}  from 'react-redux'
import { RootState } from './store/reducer';
import { vocabularyActions } from './store/vocabulary-slice';
import {Move} from './models'
function App() {
  const vocabulary = useSelector((state: RootState)=> state.vocabulary.vocabulary)
  const vocabularyByStages = useSelector((state: RootState)=> state.vocabulary.vocabularyByStages)
  const vocabularyQuestion=  useSelector((state: RootState)=> state.vocabulary.words) //useState<{words: Array<string>,  language: string}>({words: [], language: 'Eng'})
  const language = useSelector((state: RootState)=> state.settings.language)
  const dispatch = useDispatch()
  const [lesson, setLesson] = useState('')
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
    let [currentWord, les] =DataModifier.getWord(!vocabularyByStages.length? vocabulary: vocabularyByStages, currentIndex)
    if(les){
      setLesson(les)
  currentIndex++

    }
    console.log(les)
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

  return (
    <div className="App">
     <h2 className="title" > Welcome Georgian/English PDF vocabulary learner  🤗  </h2>
      {
        vocabulary.length?  <Dashboard lesson={lesson} onChangeWords={changeWordsHandler} language={language} page={{start: index+1, last: !vocabularyByStages.length? vocabulary.length: vocabularyByStages.filter(el=>!el.includes('LESSON')) .length}}  buttSettings={buttons} onChangeWord={changeWord} word={vocabularyQuestion} /> : <VocabularyForm  />
      }
      
     
    </div>
  );
}

export default App;
