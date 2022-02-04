import React, {useState} from 'react';
import './App.css';
import VocabularyForm from './components/vocabularyForm/vocabularyForm';
import GuessWords from './components/guessWords/guessWords';
import {addMissingWordsBack} from './utils/missingWords'



function App() {
  const [vocabulary, setVocabulary] = useState<{words: Array<string>,  language: string}>({words: [], language: 'Eng'})
  const [word, setWord] = useState<{question: string, answer: string}>({question: '', answer: ''})
  const [index,  setIndex] = useState<number>(0)
  const [buttons,  setButtons] = useState<{prevDisable: boolean, nextDisable: boolean}>({prevDisable: true, nextDisable: false})
  
  const processData = (words: string, language: string)=>{
    console.log(language)
      if(words){
        console.log(words)
        const splitted = words.split('\n').filter(text=> text)
        const updatedWords = addMissingWordsBack(splitted)
        setVocabulary({words: updatedWords, language})
        console.log(words.split('–'))
        console.log(splitted[index].split('–'))
        const firstWord: Array<string> = updatedWords[0].split('–').length ? updatedWords[0].split('–'): updatedWords[0].split('-')



        setWord({
          question: firstWord[ language==='Geo'? 1: 0],
          answer: firstWord[ language==='Geo'? 0: 1]
        })
      }
      
  }

  const changeWord  = (direction: string)=>{

    let currentIndex = index
    if(direction  ==="Next"){
      currentIndex++;
      if(buttons.prevDisable){
        setButtons({
          ...buttons,
          prevDisable: false
        })
      }
      if(!vocabulary.words[currentIndex +1]){
        setButtons({
          prevDisable: false,
          nextDisable: true
        })
      }
    }else{
      currentIndex--
      if(buttons.nextDisable){
        setButtons({
          ...buttons,
          nextDisable: false
        })
      }
      if(!vocabulary.words[currentIndex -1]){
        setButtons({
          prevDisable: true,
          nextDisable: false
        })
      }
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

  return (
    <div className="App">
     <h2> Welcome Georgian/English PDF vocabulary learner  🤗  </h2>
      {
        vocabulary.words.length ?  <GuessWords language={vocabulary.language} page={{start: index+1, last: vocabulary.words.length}}  buttSettings={buttons} onChangeWord={changeWord} word={word} /> : <VocabularyForm processData={processData} />
      }
      
     
    </div>
  );
}

export default App;
