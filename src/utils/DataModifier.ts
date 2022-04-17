 

 /**
  * modifies pdf string into suitable format
  * 
  */
 class DataModifier {
   
  /**
   * 
   * @param words pdf string
   * @param done callback function
   */
   modifyWords(words: string, done:  (data: {updatedWords: string[], firstWord: Array<string>, title: string})=> void ){
        const splitted = words.split('\n').filter(text=> text && !text.includes('LESSON') && !text.includes('Stage') && text.length >3)
        const updatedWords = this.addMissingWordsBack(splitted)
      
        let firstWord: Array<string> = this.getWord(updatedWords, 0)
        const title =  ''
        done({updatedWords, firstWord, title })
    }


    public getWord(words: string[],index: number): string[]{
    return words[index].split('–').length >1 ? words[index].split('–'): words[index].split('-')
  }



/**
 * 
 * @param vocabulary words 
 * @returns ads missing word back, because we are splitting  words with /n new line, some long words are jumping down and this function adds them back
 */
  private  addMissingWordsBack(vocabulary: Array<string>): Array<string>  {
        const vocabularyCopy = [...vocabulary]
        vocabularyCopy.forEach((sentence: string, index)=>{
          if(!sentence.includes('-') && !sentence.includes('–') && !sentence.includes('LESSON')){
            vocabularyCopy.splice(index, 1)
            vocabularyCopy[index-1] =   `${vocabularyCopy[index-1]} ` + sentence
          }
         
        })
    
        return [...vocabularyCopy]
    }

}

export default new DataModifier()