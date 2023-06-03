import { RootState } from "../store/reducer"
import { Lesson } from "../store/vocabulary-slice"

/**
 * 
 * @param activeStagesKey active lessns
 * @param lesson lessons data
 * @param currTitle current title
 * @param searchWord word which we want to find
 * @param continued - means that words are just submitted so no need of searching and we start from the first lesson title
 * @returns lesson title name if search word will match it
 */
export const determineTitle = (activeStagesKey: number[], lesson: Lesson, currTitle: string, searchWord: string, continued?: boolean): [boolean, string] => {
   let title: string =''
   let found =false
    activeStagesKey.some(key=> {
        let includes = lesson[key].vocabulary.some(voc=> voc.includes(searchWord))
        if(continued){
            title = lesson[key].lesson
            found =true
            return true
        }
        
        if(includes && currTitle !== lesson[key].lesson){
            title = lesson[key].lesson
            found =true
             return true
         }
    })

    return [found, title]
}


export const determineIfSelectedAsHardWord  =(hardWords: string[], answer: string)=>{
    if(!hardWords.length){
        return false
    }
    
 return   hardWords.some(word=>{
      return word.includes(answer)
   })

}



/**
 * 
 * @param text1 
 * @param text2 
 * @returns matching number from this two parameters
 */
export function findMatchingLetters(text1: string, text2: string): number {
    const length = Math.min(text1.length, text2.length);
    let counter = 0;
    for (let i = 0; i < length; i++) {
      if (text1[i] === text2[i]) {
        counter++;
      } else {
        break;
      }
    }
    return counter;
  }