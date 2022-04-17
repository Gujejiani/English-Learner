import React, {useState} from 'react';
import './App.css';
import VocabularyForm from './components/vocabularyForm/vocabularyForm';
import Dashboard from './container/dashboard/dashboard';
import {LangMode} from './models/index'
import {buttonController} from './utils/buttonController'
import DataModifier from './utils/DataModifier'
import {useDispatch, useSelector}  from 'react-redux'
import { RootState } from './store/reducer';
import { vocabularyActions } from './store/vocabulary-slice';
import {Move} from './models/move'
function App() {
  const vocabulary = useSelector((state: RootState)=> state.vocabulary.vocabulary)
  const vocabularyQuestion=  useSelector((state: RootState)=> state.vocabulary.words) //useState<{words: Array<string>,  language: string}>({words: [], language: 'Eng'})
  const language = useSelector((state: RootState)=> state.settings.language)
  const dispatch = useDispatch()
  
  const [index,  setIndex] = useState<number>(0)
  const [buttons,  setButtons] = useState<{prevDisable: boolean, nextDisable: boolean}>({prevDisable: true, nextDisable: false})
  const changeWord  = (direction: string)=>{

    let currentIndex: number;
    if(direction  ===Move.NEXT){
     currentIndex = buttonController({index, next: true, words: vocabulary}, buttons, setButtons)
    }else{
      currentIndex = buttonController({index, next: false, words: vocabulary}, buttons, setButtons)
    }
    let currentWord =DataModifier.getWord(vocabulary, currentIndex)
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
  }

  return (
    <div className="App">
     <h2> Welcome Georgian/English PDF vocabulary learner  🤗  </h2>
      {
      vocabulary.length ?  <Dashboard onChangeWords={changeWordsHandler} language={language} page={{start: index+1, last: vocabulary.length}}  buttSettings={buttons} onChangeWord={changeWord} word={vocabularyQuestion} /> : <VocabularyForm  />
      }
      
     
    </div>
  );
}

export default App;
