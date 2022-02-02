


export const addMissingWordsBack =(vocabulary: Array<string>): Array<string> => {
    const vocabularyCopy = [...vocabulary]
    vocabularyCopy.forEach((sentence: string, index)=>{
  
      if(!sentence.includes('-') && !sentence.includes('–')){
        console.log(sentence)
        console.log(vocabulary[index])

        vocabularyCopy.splice(index, 1)
        console.log(vocabularyCopy)
        vocabularyCopy[index-1] =   `${vocabularyCopy[index-1]} ` + sentence
      }
     
    })

    return [...vocabularyCopy]
}