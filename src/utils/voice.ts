export const speak = (msg: string, geo?: boolean): void => {
  const sp = new SpeechSynthesisUtterance(msg);
  sp.rate = 0.8;

  // Get the list of available voices
  const availableVoices = speechSynthesis.getVoices();

  // Set the voice for native British English
  const britishVoiceIndex = availableVoices.findIndex(voice => voice.lang === 'en-GB');
  sp.voice = britishVoiceIndex !== -1 ? availableVoices[britishVoiceIndex] : availableVoices[0];

  speechSynthesis.speak(sp);
};
