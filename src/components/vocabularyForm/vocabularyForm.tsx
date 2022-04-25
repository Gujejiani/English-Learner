import  styles from './vocabularyForm.module.css'
import  React, { useState} from 'react'
import Toggle from '../../ui/toggle/toggle'
import FileUpload from '../fileUpload/fileUpload'
import {LangMode} from '../../models/index'
import { sendPdfData } from '../../store/vocabulary-effects'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/reducer';
import { settingsActions } from '../../store/settings-slice'
 const VocabularyForm: React.FC = ()=>{

    const dispatch = useDispatch()
    const [pdfFile, setPdfFile]= useState<File>()
    const uploaded = useSelector((state: RootState)=> state.vocabulary.uploaded)
    const language = useSelector((state: RootState)=> state.settings.language)
    const  [processing, setProcessing ] = useState<boolean>(true) 
  

  

    const submitHandler =(e: React.FormEvent)=>{
        e.preventDefault()
        console.log(pdfFile)
      
		if(!pdfFile){
            return;
        }
        dispatch(sendPdfData(pdfFile, language))
    }
  
     const toggleHandler =()=>{
            dispatch(settingsActions.changeLanguage())
     }
     
     const pdfHandler = (file: File)=>{
         setPdfFile(file)
         setProcessing(false)
     }

   return ( <form  onSubmit={submitHandler} className={styles.form} >
     <h5 className={styles.form__heading} >Please Upload Your Vocabulary</h5>
   
     <FileUpload fileUploaded={pdfHandler} />
  

    <div className={styles.language} > 
    <h3>Choose Questions Language  </h3>
    <Toggle toggle={language ===LangMode.GEO } onToggled={toggleHandler} />
    </div>
   
    <button className={`${styles.form__button} ${processing  ? styles.disable: '' }`}  disabled={processing }  type="submit" > {uploaded? 'Processing...': 'Start Processing' }</button>
    </form>)
}

export default VocabularyForm