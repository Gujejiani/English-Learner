import React, { Props, useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from './birds.json';
import './animation.css';
import { PropsFn } from '../../models';

export const Animation: React.FC<{onShowHint: PropsFn, wordChangeCount: number}> = (props) => {
 
  const [helpWithHint, setHelpWithHint]=useState(false)
  const [showInfo, setShowInfo]= useState(true)

  const clickEvent = (e: any)=>{

    if(helpWithHint){
      props.onShowHint()
    }
   


  }
  useEffect(()=>{
    const timeOut = setTimeout(()=>{
        setShowInfo(false)
    }, 3000);


   return ()=> clearTimeout(timeOut);
    
  }, [showInfo])

  useEffect(()=>{

    setHelpWithHint(false)
    const timeOut = setTimeout(()=>{
        setHelpWithHint(true)
        setShowInfo(true)
    }, 10000);



   return ()=> clearTimeout(timeOut);
    
  }, [props.wordChangeCount])










  return (
    <div className={`animation ${helpWithHint? 'show-animation': ''} `}>
      <div className={`message-container`}>
        <div className={`message-bubble  ${showInfo? '': 'hide'}`}>
          <p className="message-text">Click Us For Hint</p>
        </div>
        <div className={`speech-arrow ${showInfo? '': 'hide-arrow'}`  } ></div>
      </div>
      <Lottie
        onClick={clickEvent}
        animationData={animationData}
        style={{ width: '140px', height: '120px', backgroundColor: 'transparent' }}
        loop={true}
        controls
        autoplay
      />
    </div>
  );
};

export default Animation;
