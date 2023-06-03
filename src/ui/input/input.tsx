import React, { ChangeEvent, useState, useRef, useEffect } from 'react';
import './input.css';
import successSound from '../../audio/success1.mp3';
import { PropsFn } from '../../models';
import { findMatchingLetters } from '../../utils/utils';

const MyInput: React.FC<{show?: boolean, hintIndex:number, answerWord: string, showAnswer: PropsFn, wordChangeCount: number, playSound: boolean, onSuccess: PropsFn}> = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [insertedText, setInsertedText] = useState('');

  const [audio, setAudio] = useState<HTMLAudioElement>()

  const [hintIndex, setHintIndex]=useState(0)

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
  
    setInsertedText(e.target.value);
  }
  

  function focusHandler() {
    setIsActive(true);
  }
  useEffect(()=>{
    setInsertedText('')
    focusOnInput()
    
  
  }, [props.wordChangeCount])

  function focusOnInput(){
    const input = document.getElementById('inp') as HTMLInputElement


    if(input){
     input.focus()
    }
  }

  useEffect(()=>{
    

    let hintedIndex = props.hintIndex

    if(insertedText.length){
      hintedIndex += findMatchingLetters(insertedText, props.answerWord) 
    }
  
    setHintIndex(hintedIndex)
    if(props.hintIndex){
      playAudio()
    }
   
  }, [props.hintIndex])

  useEffect(()=>{
    const au = new Audio(successSound)
    
    setAudio(au)
    
    setTimeout(()=>{
      focusOnInput()
    }, 1000)
  }, [])



  useEffect(()=>{
    if(props.playSound && audio && insertedText.length && insertedText.trim() === props.answerWord.trim()){
    
      playAudio()
      props.showAnswer()
      setTimeout(()=>{
        props.onSuccess()
      }, 1400)
    }
  },[insertedText, props.answerWord, audio, props.playSound])

  useEffect(()=>{
      if(!props.show){
        setInsertedText('')
      }
  }, [props.show])

  function blurHandler() {
    setIsActive(false);
  }
  const  playAudio=()=>{
    if(!audio){
      return
    }
    audio.play().finally().catch(err=>{
      console.log(err)
    });
  }
 

 
  function getLetterStyle(letterIndex: number): React.CSSProperties {
  
    let isMatching = insertedText.charAt(letterIndex) === props.answerWord.charAt(letterIndex);

    if(hintIndex && (hintIndex-1 >= letterIndex)){
      isMatching=true
    }
    const color = isMatching ? '#0db5ba' : '#fff';
    const filter = isMatching ? 'blur(0)' : 'blur(7px)'; // add filter property
    let transition 

    if(insertedText){
      transition = 'filter 0.3s ease-in-out'; // add transition property
    }else {
      transition = 'none'; // add transition property

    }
    
    return { color, filter, transition };
  }

  return (
    <div>
      {props.answerWord.split('').map((letter, index) => (
        <span onClick={props.showAnswer} className={`answer ${props.show? 'showAnswer': ''}`} key={index} style={getLetterStyle(index)}>
          {letter}
        </span>
      ))}
      <label htmlFor="inp" className={`inp ${isActive ? 'active' : ''}`}>
        <input
          type="text"
          onChange={changeHandler}
          onFocus={focusHandler}
          onBlur={blurHandler}
          value={insertedText}
          id="inp"
          autoComplete='off'
        />
        <span className="focus-bg"></span>
      </label>
   
    </div>
  );
};

export default MyInput;
