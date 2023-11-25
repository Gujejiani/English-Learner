import { georgianLetters } from './engAlphToGeo';
import { LangMode } from './../models/langMode';
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
        const updatedWords =  words.replace(/LEESON/g, 'LESSON');
        const vocabulary =  updatedWords.split('LESSON').map((el)=>{
        return  el.split('\n').filter(text=> text && text.length >3)
    })

      vocabulary.forEach((stage, i)=>{
          
          const stages =  [...stage]
     
          if(stage.length ===1){
              stagesData.stage = stage[0]
          }else {
              let key: number = Number(stages[0]);

              stagesData[key]={
                  lesson: 'LESSON ' + stages[0],
                  vocabulary: this.addMissingWordsBack(this.removeGeorgianWords(stages.slice(1, stages.length)))
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
  public  addMissingWordsBack(vocabulary: Array<string>, index: number = 0): Array<string> {
    if (index >= vocabulary.length) {
      return [...vocabulary];
    }
  
    const sentence = vocabulary[index];
  
    if (!sentence.includes('-') && !sentence.includes('–') && !sentence.includes('LESSON')) {
      vocabulary.splice(index, 1);
      vocabulary[index-1] = `${vocabulary[index-1]} ` + sentence;
      return this.addMissingWordsBack(vocabulary, index);
    }
  
    return this.addMissingWordsBack(vocabulary, index + 1);
  }


  public removeGeorgianWords(vocabulary: string[]){
    const language =JSON.parse(localStorage.getItem('language') as string) 
   
    const updVocabulary =  LangMode.GEO ===language?   vocabulary.filter((word, index)=>{
      
 
    const englishWord =   word.split('–').length >1 ? word.split('–')[0]: word.split('-')[0]

    return  !englishWord.split('').some((letter, index)=>{
           
            return georgianLetters.includes(letter)


               
            })
            
      }): vocabulary


      return updVocabulary

  }
  shuffle(array: string[]) {
    let shuffled = array.sort(() => Math.random() - 0.5);
    return [...shuffled]
  }
}

export default new DataModifier()