import axios from "axios"
import { LangMode } from "../models"
import DataModifier from "../utils/DataModifier"
import { StateDispatch } from "./reducer"
import { vocabularyActions } from "./vocabulary-slice"


export const PDF_EXTRACT_URL ='https://pdf-extractor-lty1.onrender.com/extract-text'



export const sendPdfData =(pdfFile: File, language: LangMode) => {
    return (dispatch: StateDispatch)=>{
 
    
     dispatch(vocabularyActions.addVocabulary())
 
 
     const formData = new FormData()
    
   
     formData.append('pdfFile',pdfFile)
     axios.post<string>(PDF_EXTRACT_URL, formData).then(res=>{
       
    
        
          const done =  (data:{updatedWords: string[], firstWord: Array<string>, title: string})=>{
          dispatch(vocabularyActions.addVocabularySuccess(data.updatedWords)) // {type: some_unique_action_name, payload: what you will pass}

          let questIndex = language ===LangMode.GEO? 1: 0
          let answerIndex =  language===LangMode.GEO? 0: 1

          dispatch(vocabularyActions.changeWord({ question: data.firstWord[questIndex],  answer: data.firstWord[answerIndex], }))
      
        }
        localStorage.setItem('vocabulary', JSON.stringify(res.data))

        // modifying pdf string to array with 
        DataModifier.modifyWords(res.data, done)

        DataModifier.splitByStages(res.data)
         dispatch(vocabularyActions.addVocabularyByStages(res.data))
        
        
     }).catch(err=>{
         console.log(err)
         dispatch(vocabularyActions.addVocabularyFail())
     })  
 
 
    }
 }