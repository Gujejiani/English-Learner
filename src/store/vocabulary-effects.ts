import axios from "axios"
import { LangMode } from "../models"
import DataModifier from "../utils/DataModifier"
import { StateDispatch } from "./reducer"
import { vocabularyActions } from "./vocabulary-slice"






export const sendPdfData =(pdfFile: File, language: LangMode) => {
    return (dispatch: StateDispatch)=>{
 
 
     dispatch(vocabularyActions.addVocabulary())
 
 
     const formData = new FormData()
    
     console.log('sending request')
     formData.append('pdfFile',pdfFile)
     axios.post<string>('http://localhost:1111/extract-text', formData).then(res=>{
         console.log(res.data)
        console.log(res)

        
            const done =  (data:{updatedWords: string[], firstWord: Array<string>, title: string})=>{
          dispatch(vocabularyActions.addVocabularySuccess(data.updatedWords)) // {type: some_unique_action_name, payload: what you will pass}

          let questIndex = language ===LangMode.GEO? 1: 0
          let answerIndex =  language===LangMode.GEO? 0: 1

          dispatch(vocabularyActions.changeWord({ question: data.firstWord[questIndex],  answer: data.firstWord[answerIndex], }))
      
        }
        // modifying pdf string to array with 
        DataModifier.modifyWords(res.data, done)



        
     }).catch(err=>{
         console.log(err)
         dispatch(vocabularyActions.addVocabularyFail())
     })  
 
 
    }
 }