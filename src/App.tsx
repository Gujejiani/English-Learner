import React, {useState} from 'react';
import './App.css';
import VocabularyForm from './components/vocabularyForm/vocabularyForm';
import GuessWords from './components/guessWords/guessWords';

import {buttonController} from './utils/buttons'
import DataModifier from './utils/DataModifier'

function App() {
  const [vocabulary, setVocabulary] = useState<{words: Array<string>,  language: string}>({words: [], language: 'Eng'})
  const [word, setWord] = useState<{question: string, answer: string, title: string}>({question: '', answer: '', title: ''})
  const [index,  setIndex] = useState<number>(0)
  const [buttons,  setButtons] = useState<{prevDisable: boolean, nextDisable: boolean}>({prevDisable: true, nextDisable: false})
  
  const processData = (words: string, language: string)=>{

      if(words){
        const done =  (data:{updatedWords: string[], firstWord: Array<string>, title: string})=>{
          setVocabulary({words: data.updatedWords, language})
          let questIndex = language==='Geo'? 1: 0
          let answerIndex =  language==='Geo'? 0: 1
          setWord({
            question: data.firstWord[questIndex],
            answer: data.firstWord[answerIndex],
            title: data.title
          })
      
        }
      
        DataModifier.modifyWords(words, done)
      }
      
  }

 

  const changeWord  = (direction: string)=>{
  
    let currentIndex: number;
    if(direction  ==="Next"){
     currentIndex = buttonController({index, next: true, words: vocabulary.words}, buttons, setButtons)
    }else{
      currentIndex = buttonController({index, next: false, words: vocabulary.words}, buttons, setButtons)
    }
    let currentWord =DataModifier.getWord(vocabulary.words, currentIndex)
    let title= ''

    let questIndex = vocabulary.language==='Geo'? 1: 0
    let answerIndex =  vocabulary.language==='Geo'? 0: 1
    setWord({
      question: currentWord[questIndex],
      answer: currentWord[answerIndex],
      title: title
    })
    setIndex(currentIndex)
  }

  const changeWordsHandler =()=>{
    setVocabulary({
      words: [],
      language: 'Geo',
    })
    setWord({question: '', answer: '', title:  ''})
    setIndex(0)
    setButtons({nextDisable: false, prevDisable: true})
  }

  return (
    <div className="App">
     <h2> Welcome Georgian/English PDF vocabulary learner  🤗  </h2>
      {
        vocabulary.words.length ?  <GuessWords onChangeWords={changeWordsHandler} language={vocabulary.language} page={{start: index+1, last: vocabulary.words.length}}  buttSettings={buttons} onChangeWord={changeWord} word={word} /> : <VocabularyForm processData={processData} />
      }
      
     
    </div>
  );
}

export default App;
