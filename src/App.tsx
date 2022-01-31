import React, {useState} from 'react';
import './App.css';
import VocabularyForm from './components/vocabularyForm/vocabularyForm';
import GuessWords from './components/guessWords/guessWords';

function App() {
  const [data, setData] = useState<Array<string>>([])
  const [word, setWord] = useState<{question: string, answer: string}>({question: '', answer: ''})
  const [index,  setIndex] = useState<number>(0)
  
  
  const processData = (words: string)=>{
      if(words){
        const splitted = words.split('\n').filter(text=> text)
        setData(splitted)
        console.log(data)
        console.log(splitted[index].split('–'))
        const firstWord: Array<string> = splitted[0].split('–')
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
    }else{
      currentIndex--
    }
    const currentWord = data[currentIndex].split('–')
    setWord({
      question: currentWord[1],
      answer: currentWord[0]
    })
    setIndex(currentIndex)
  }

  return (
    <div className="App">
     <h2> Welcome Georgian/English To vocabulary learner </h2>
      {
        data.length ?  <GuessWords onChangeWord={changeWord} word={word} /> : <VocabularyForm processData={processData} />
      }
      
     
    </div>
  );
}

export default App;
