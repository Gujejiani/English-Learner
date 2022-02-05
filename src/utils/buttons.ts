import React from 'react'


/**
 * higher order function
 * @param - data info about button is next or prev, current index, and words array
 * @param - buttons buttons state
 * @param - setButtons setState function
 * @returns - current index of words
 */
export const buttonController  = (data: {next: boolean, index: number, words: string[]}, buttons: {prevDisable: boolean, nextDisable: boolean},setButtons: (value: React.SetStateAction<{
    prevDisable: boolean;
    nextDisable: boolean;
}>) => void): number  =>{
  let currentIndex = data.index
  data.next? currentIndex++ :  currentIndex--;

  if(data.next){
    if(buttons.prevDisable){
      setButtons({
        ...buttons,
        prevDisable: false
      })
    }
    if(!data.words[currentIndex +1]){
      setButtons({
        prevDisable: false,
        nextDisable: true
      })
    }
  }
  if(!data.next){
    if (buttons.nextDisable){
      setButtons({
        ...buttons,
        nextDisable: false
      })
    }
    if(!data.words[currentIndex -1]){
      setButtons({
        prevDisable: true,
        nextDisable: false
      })
    }
    
  }
  return currentIndex
}