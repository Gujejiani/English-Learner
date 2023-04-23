
  export const speak = (msg: string, geo?: boolean): void => {
    const sp = new SpeechSynthesisUtterance(msg);
    sp.rate = 0.8;
    if(geo){
      sp.lang ='ka-GE'
    }
    [sp.voice] = speechSynthesis.getVoices();
    speechSynthesis.speak(sp);
    
  }