import React from 'react';
import  styles from './Learned-words.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from "@react-icons/all-files/md/MdDelete";
import { LearnedWord, vocabularyActions } from '../../store/vocabulary-slice';
import { FaEyeSlash } from "@react-icons/all-files/fa/FaEyeSlash";
import { FaEye } from "@react-icons/all-files/fa/FaEye";
const LearnedWords = () => {
  const dispatch = useDispatch();

  const learnedWords = useSelector((state: any) => state.vocabulary.learnedWords);  
  const deleteHandler = (word: {georgian: string, english: string})=>{
    
    dispatch(vocabularyActions.learnedWordAdded(word))

  }
 const changeVisibilityHandler =(word: LearnedWord, updateEnglish: boolean)=>{
    dispatch(vocabularyActions.changeVisibility({word: word, updateEnglish: updateEnglish}))
 }
 const changeManyWordsVisibility = (englishWords: boolean,)=>{
  dispatch(vocabularyActions.changeEveryLearnedWordVisibility({english: englishWords}))
 }
  return  <div className={styles.container} >
    <div className={styles.titles} >
      
    <div className={styles.georgian} >
      
           <h3 onClick={()=> changeManyWordsVisibility(false)} className={styles.georgian_title} >Georgian Words

           {learnedWords.every((word: LearnedWord)=>{
            return word.georgianVisible 
         
           }) ? <FaEye size={'1em'}/>
           :   <FaEyeSlash size={'1em'}/> }
           </h3>
     
       </div>
       <div className={styles.english} >
        <h3 onClick={()=> changeManyWordsVisibility(true)} className={styles.english_title} >English Words

        {learnedWords.every((word: LearnedWord)=>{
            return word.englishVisible 
         
           }) ? <FaEye size={'1em'}/>
           :   <FaEyeSlash size={'1em'}/> }
        </h3>
         </div>
    </div>
      
         <div className={styles.dictionary} >
          

          {
            learnedWords.map((word: LearnedWord, index: number) => {

              return   <ul key={word.georgian + index} className={styles.dictionary_list} >

                        
             {word.georgianVisible ? <li onClick={()=>changeVisibilityHandler(word, false)}  className={`${styles.word_list_word} ${styles.georgian_word}`} >
    
              <div className={styles.word_text}>{word.georgian}</div>
    
              </li>: <li onClick={()=>changeVisibilityHandler(word, false)} className={`${styles.georgian_word} ${styles.word_list_word}`}>
              <div className={`${styles.word_text} ${styles.blur__place_holder}` }>Place Holder Text</div>
                </li>}
             
             {
              word.englishVisible ? 
              <li onClick={()=>changeVisibilityHandler(word, true)}  className={`${styles.word_list_word} `} >
              <div className={`${styles.word_text}`}>{word.english}</div>
              </li> :
              <li onClick={()=>changeVisibilityHandler(word, true)} className={`${styles.word_list_word}`}>
              <div className={`${styles.word_text} ${styles.blur__place_holder}` }>Place Holder Text</div>
                </li>
             }
             
              
                <li onClick={()=> deleteHandler(word)} className={styles.delete} ><MdDelete/></li>
              </ul>
            })
          }
                
         </div>
    </div>
};

export default LearnedWords;
