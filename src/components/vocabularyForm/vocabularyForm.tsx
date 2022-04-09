import  styles from './vocabularyForm.module.css'
import  React, { useState} from 'react'
import Toggle from '../../ui/toggle/toggle'
import FileUpload from '../fileUpload/fileUpload'
import {LangMode} from '../../models/index'
import axios from 'axios';

import {vocabularyActions} from '../../store/vocabulary-slice'
import { useStateDispatch } from '../../store/store'
 const VocabularyForm: React.FC<{processData: (data: string, language: string)=> void}> = (props)=>{

   const dispatch = useStateDispatch()

    const [pdfFile, setPdfFile]= useState<File>()
    const [buttonInfo, setButtonInfo]  = useState<{text: string, disable: boolean}>({
        text: "Start Processing",
        disable: true
    })
    const [language, setLanguage]   = useState<string>(LangMode.GEO)

  

    const submitHandler =(e: React.FormEvent)=>{
        e.preventDefault()
        console.log(pdfFile)
        const formData = new FormData()
		if(!pdfFile)return;

		formData.append('pdfFile',pdfFile)
		axios.post<{data: string}>('http://localhost:1111/extract-text', formData).then(res=>{
			console.log(res.data)

            dispatch(vocabularyActions.addVocabulary(res.data.data)) // {type: some_unique_action_name, payload: what you will pass}
		})

            setButtonInfo({
                text: "Processing...",
                disable: false
            })

           
        
    }
  
     const toggleHandler =()=>{
            setLanguage(language !==LangMode.ENG ? LangMode.ENG: LangMode.GEO )
     }
     
     const pdfHandler = (file: File)=>{
         setPdfFile(file)
         setButtonInfo({...buttonInfo,disable: false }  )
     }

   return ( <form  onSubmit={submitHandler} className={styles.form} >
     <h5 className={styles.form__heading} >Please Upload Your Vocabulary</h5>
   
     <FileUpload fileUploaded={pdfHandler} />
  

    <div className={styles.language} > 
    <h3>Choose Questions Language  </h3>
    <Toggle toggle={language ===LangMode.GEO? true: false } onToggled={toggleHandler} />
    </div>
   
    <button className={`${styles.form__button} ${buttonInfo.disable  ? styles.disable: '' }`}  disabled={buttonInfo.disable }  type="submit" > {buttonInfo.text}</button>
    </form>)
}

export default VocabularyForm