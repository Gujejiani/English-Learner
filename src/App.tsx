import React from 'react';
import './App.css';
import VocabularyForm from './components/vocabularyForm/vocabularyForm';
function App() {

  const processData = (data: string)=>{
    console.log(String(data))
      console.log(String(data).split('–'))
  }
  return (
    <div className="App">
      Welcome Georgian/English To vocabulary learner

      <VocabularyForm processData={processData} />
    </div>
  );
}

export default App;
