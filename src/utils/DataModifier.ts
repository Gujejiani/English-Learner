 

 
 class DataModifier {
   
   modifyWords(words: string, done:  (data: {updatedWords: string[], firstWord: Array<string>})=> void ){
        const splitted = words.split('\n').filter(text=> text)
        const updatedWords = this.addMissingWordsBack(splitted)
      
        const firstWord: Array<string> = updatedWords[0].split('–').length ? updatedWords[0].split('–'): updatedWords[0].split('-')
    
        done({updatedWords, firstWord })
    }







  private  addMissingWordsBack(vocabulary: Array<string>): Array<string>  {
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

}

export default new DataModifier()