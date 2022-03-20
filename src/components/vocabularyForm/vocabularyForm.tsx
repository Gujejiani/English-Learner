import  styles from './vocabularyForm.module.css'
import  React, {useRef, useState, useEffect} from 'react'
import Toggle from '../../ui/toggle/toggle'
import FileUpload from '../fileUpload/fileUpload'
import {LangMode} from '../../models/index'
import axios from 'axios';
 const VocabularyForm: React.FC<{processData: (data: string, language: string)=> void}> = (props)=>{
    const [pdfFile, setPdfFile]= useState<File>()
    const [buttonInfo, setButtonInfo]  = useState<{text: string, disable: boolean}>({
        text: "Start Processing",
        disable: true
    })
    const [language, setLanguage]   = useState<string>(LangMode.GEO)
    const [words, setWords] = useState<string>('')
        useEffect(()=>{
            // const inputData = localStorage.getItem('data')
            // const lang = localStorage.getItem('lang')
            // if(inputData && inputData !== "undefined"){

            //     const data: string = JSON.parse(inputData);
            //       setWords(data);
            //       setButtonInfo({...buttonInfo,disable: false }  )
                
            // }
        
            // if(lang){
            //     let parsedLang = JSON.parse(lang)
              
            //     if(parsedLang === LangMode.ENG){
            //         setLanguage(LangMode.ENG)
            //     }
            // }
        }, [])

    const submitHandler =(e: React.FormEvent)=>{
        e.preventDefault()
        console.log(pdfFile)
        const formData = new FormData()
		if(!pdfFile)return;
		formData.append('pdfFile',pdfFile)
		axios.post<{data: string}>('http://localhost:1111/extract-text', formData).then(res=>{
			console.log(res.data)
		})




            setButtonInfo({
                text: "Processing...",
                disable: false
            })
            // setTimeout(()=>{
            //     if(textAreaInput.current?.value){
            //     props.processData(textAreaInput.current?.value, language)
               
              
            // }
            // }, 2000)
           
        
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
     {/* <div className={styles.wrapper} >
  
     <textarea value={words}  onChange={changeHandler}  ref={textAreaInput} className={styles.form__input}  />
     <button disabled={!words ? true: false } onClick={clearHandler} type='button' className={`${styles.button} ${words? '': styles.disable }`} >Clear</button>
         </div>     */}
   

    <div className={styles.language} > 
    <h3>Choose Questions Language  </h3>
    <Toggle toggle={language ===LangMode.GEO? true: false } onToggled={toggleHandler} />
    </div>
   
    <button className={`${styles.form__button} ${buttonInfo.disable  ? styles.disable: '' }`}  disabled={buttonInfo.disable }  type="submit" > {buttonInfo.text}</button>
    </form>)
}

export default VocabularyForm