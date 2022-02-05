
  export const speak = (msg: string): void => {
    const sp = new SpeechSynthesisUtterance(msg);
    sp.rate = 0.5;
    [sp.voice] = speechSynthesis.getVoices();
    speechSynthesis.speak(sp);
    
  }