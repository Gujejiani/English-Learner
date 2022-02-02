import React, {useState} from 'react';
import './App.css';
import VocabularyForm from './components/vocabularyForm/vocabularyForm';
import GuessWords from './components/guessWords/guessWords';
import {addMissingWordsBack} from './utils/missingWords'
function App() {
  const [vocabulary, setVocabulary] = useState<Array<string>>([])
  const [word, setWord] = useState<{question: string, answer: string}>({question: '', answer: ''})
  const [index,  setIndex] = useState<number>(0)
  const [buttons,  setButtons] = useState<{prevDisable: boolean, nextDisable: boolean}>({prevDisable: true, nextDisable: false})
  
  const processData = (words: string)=>{
      if(words){
        console.log(words)
        const splitted = words.split('\n').filter(text=> text)
        const updatedWords = addMissingWordsBack(splitted)
        setVocabulary(updatedWords)
        console.log(words.split('–'))
        console.log(splitted[index].split('–'))
        const firstWord: Array<string> = updatedWords[0].split('–').length ? updatedWords[0].split('–'): updatedWords[0].split('-')
        setWord({
          question: firstWord[1],
          answer: firstWord[0]
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
      if(!vocabulary[currentIndex +1]){
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
      if(!vocabulary[currentIndex -1]){
        setButtons({
          prevDisable: true,
          nextDisable: false
        })
      }
    }
  let currentWord;

    if(vocabulary[currentIndex].includes('–')){
      currentWord = vocabulary[currentIndex].split('–')
    }else{
     currentWord = vocabulary[currentIndex].split('-')
    }
  

    setWord({
      question: currentWord[1],
      answer: currentWord[0]
    })
    setIndex(currentIndex)
  }

  return (
    <div className="App">
     <h2> Welcome Georgian/English vocabulary learner </h2>
      {
        vocabulary.length ?  <GuessWords page={{start: index+1, last: vocabulary.length}} buttSettings={buttons} onChangeWord={changeWord} word={word} /> : <VocabularyForm processData={processData} />
      }
      
     
    </div>
  );
}

export default App;
