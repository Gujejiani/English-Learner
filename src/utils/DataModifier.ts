/**
  * modifies pdf string into suitable format
  *
  */
import {Lesson} from "../store/vocabulary-slice";


class DataModifier {
   
  /**
   * 
   * @param words pdf string
   * @param done callback function
   */
   modifyWords(words: string, done:  (data: {updatedWords: string[], firstWord: Array<string>, title: string})=> void ){
        const splitted = words.split('\n').filter(text=> text && !text.includes('LESSON') && !text.includes('Stage') && text.length >3)
        const updatedWords = this.addMissingWordsBack(splitted)

        let firstWord: string[] = this.getWord(updatedWords, 0)
    let title =''
        done({updatedWords, firstWord, title })
    }


    public getWord(words: string[],index: number):string[]{
      let receivedWords = words
      let splitted =  receivedWords[index].split('–').length >1 ? receivedWords[index].split('–'): receivedWords[index].split('-')
      if(splitted.length > 2){
        splitted = splitted.filter(word=> !word.includes(')'))
      }

      return splitted
  }


    /**
     * @description splitts vocabulary by lessons
     * @param words all words data
     *
     */
  splitByStages(words: string){
       const stagesData: Lesson ={};

    const vocabulary = words.split('LESSON').map((el)=>{
        return  el.split('\n').filter(text=> text && text.length >3)
    })

      vocabulary.forEach((stage, i)=>{
          const stages = [...stage]

          if(stage.length ===1){
              stagesData.stage = stage[0]
          }else {
              let key: number = Number(stages[0]);

              stagesData[key]={
                  lesson: 'LESSON ' + stages[0],
                  vocabulary: stages.slice(1, stages.length)
              }
          }

      })
      return stagesData

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