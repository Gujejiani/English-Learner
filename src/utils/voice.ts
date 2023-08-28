export const speak = (msg: string, geo?: boolean): void => {
  const sp = new SpeechSynthesisUtterance(msg);
  sp.rate = 0.8;

  // Get the list of available voices
  const availableVoices = speechSynthesis.getVoices();
  console.log(availableVoices);

  // for mobile setting 146
  if (window.innerWidth <= 768 ) {
    sp.voice = availableVoices[146];
  } else {
    [sp.voice] = availableVoices;
  }

  speechSynthesis.speak(sp);
};
