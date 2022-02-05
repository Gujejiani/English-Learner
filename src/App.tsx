import React, {useState} from 'react';
import './App.css';
import VocabularyForm from './components/vocabularyForm/vocabularyForm';
import GuessWords from './components/guessWords/guessWords';

import {buttonController} from './utils/buttons'
import DataModifier from './utils/DataModifier'

function App() {
  const [vocabulary, setVocabulary] = useState<{words: Array<string>,  language: string}>({words: [], language: 'Eng'})
  const [word, setWord] = useState<{question: string, answer: string}>({question: '', answer: ''})
  const [index,  setIndex] = useState<number>(0)
  const [buttons,  setButtons] = useState<{prevDisable: boolean, nextDisable: boolean}>({prevDisable: true, nextDisable: false})
  
  const processData = (words: string, language: string)=>{
    console.log(language)
      if(words){
        const done =  (data:{updatedWords: string[], firstWord: Array<string>})=>{
          setVocabulary({words: data.updatedWords, language})
          setWord({
            question: data.firstWord[ language==='Geo'? 1: 0],
            answer: data.firstWord[ language==='Geo'? 0: 1]
          })
          console.log('done is called')
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
  let currentWord;

    if(vocabulary.words[currentIndex].includes('–')){
      currentWord = vocabulary.words[currentIndex].split('–')
    }else{
     currentWord = vocabulary.words[currentIndex].split('-')
    }
  
    setWord({
      question: currentWord[vocabulary.language==='Geo'? 1: 0],
      answer: currentWord[vocabulary.language==='Geo'?0: 1]
    })
    setIndex(currentIndex)
  }

  const changeWordsHandler =()=>{
    setVocabulary({
      words: [],
      language: 'Geo',
    })
    setIndex(0)
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
