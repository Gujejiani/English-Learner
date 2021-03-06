import  styles from './vocabularyForm.module.css'
import  React, { useEffect, useState} from 'react'
import Toggle from '../../ui/toggle/toggle'
import FileUpload from '../../container/fileUpload/fileUpload'
import {LangMode} from '../../models/index'
import { sendPdfData } from '../../store/vocabulary-effects'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/reducer';
import { settingsActions } from '../../store/settings-slice'
import { useHistory } from 'react-router-dom'
 const VocabularyForm: React.FC = ()=>{

    const dispatch = useDispatch()
    const history= useHistory()
    const [pdfFile, setPdfFile]= useState<File>()
    const uploaded = useSelector((state: RootState)=> state.vocabulary.uploaded)
    const language = useSelector((state: RootState)=> state.settings.language)
    const  [processing, setProcessing ] = useState<boolean>(false) 
    
  

    const submitHandler =(e: React.FormEvent)=>{
        e.preventDefault()
        console.log(pdfFile)
        setProcessing(true)
		if(!pdfFile){
            return;
        }
        setTimeout(()=> {
            dispatch(sendPdfData(pdfFile, language))
        }, 3000)
       
    }
  
     const toggleHandler =()=>{
            dispatch(settingsActions.changeLanguage())
     }
     
     const pdfHandler = (file: File)=>{
         setPdfFile(file)
         setProcessing(false)
         console.log('ended success')
     }

     useEffect(()=>{
        if(uploaded && pdfFile){
            history.push('dashboard')
            setPdfFile(undefined)
            setProcessing(false)
        }

     }, [uploaded])

   return ( <form  onSubmit={submitHandler} className={styles.form} >
     <h5 className={styles.form__heading} >Please Upload Your Vocabulary</h5>
   
     <FileUpload fileUploaded={pdfHandler} />
  

    <div className={styles.language} > 
    <h3>Choose Questions Language  </h3>
    <Toggle toggle={language ===LangMode.GEO } onToggled={toggleHandler} />
    </div>
   
    <button className={`${styles.form__button} ${!pdfFile  ? styles.disable: '' }`}  disabled={processing }  type="submit" > {processing? 'Processing...': 'Start Processing' }</button>
    </form>)
}

export default VocabularyForm