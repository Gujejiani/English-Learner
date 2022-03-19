import  styles from './vocabularyForm.module.css'
import  React, {useRef, useState, useEffect} from 'react'
import Toggle from '../../ui/toggle/toggle'
import FileUpload from '../fileUpload/fileUpload'
import {LangMode} from '../../models/index'
 const VocabularyForm: React.FC<{processData: (data: string, language: string)=> void}> = (props)=>{
    const textAreaInput = useRef<HTMLTextAreaElement>(null)
    const [buttonInfo, setButtonInfo]  = useState<{text: string, disable: boolean}>({
        text: "Start Processing",
        disable: true
    })
    const [language, setLanguage]   = useState<string>(LangMode.GEO)
    const [words, setWords] = useState<string>('')
        useEffect(()=>{
            const inputData = localStorage.getItem('data')
            const lang = localStorage.getItem('lang')
            if(inputData && inputData !== "undefined"){

                const data: string = JSON.parse(inputData);
                  setWords(data);
                  setButtonInfo({...buttonInfo,disable: false }  )
                
            }
        
            if(lang){
                let parsedLang = JSON.parse(lang)
              
                if(parsedLang === LangMode.ENG){
                    setLanguage(LangMode.ENG)
                }
            }
        }, [])

    const submitHandler =(e: React.FormEvent)=>{
        e.preventDefault()
        localStorage.setItem('data', JSON.stringify(`${textAreaInput.current?.value}`))
        localStorage.setItem('lang', JSON.stringify(`${language}`))
            setButtonInfo({
                text: "Processing...",
                disable: false
            })
            setTimeout(()=>{
                if(textAreaInput.current?.value){
                props.processData(textAreaInput.current?.value, language)
               
              
            }
            }, 2000)
           
        
    }
    const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
     
        // Start processing button
        if(e.target.value){
            setWords(e.target.value)
            setButtonInfo({
                ...buttonInfo,
                disable: false
            })
        }else{
            setButtonInfo({
                ...buttonInfo,
                disable: true
            })
        }

     }
     const toggleHandler =()=>{
        if(language !==LangMode.ENG){
            setLanguage(LangMode.ENG)
        }else{
            setLanguage(LangMode.GEO)
        }
     }
const clearHandler = () =>{
    setWords('')
    localStorage.removeItem('data')
    setButtonInfo({...buttonInfo, disable: true})
}
   return ( <form  onSubmit={submitHandler} className={styles.form} >
     <h5 className={styles.form__heading} >Please put vocabulary</h5>
     <div className={styles.wrapper} >
     <textarea value={words}  onChange={changeHandler}  ref={textAreaInput} className={styles.form__input}  />
     <button disabled={!words ? true: false } onClick={clearHandler} type='button' className={`${styles.button} ${words? '': styles.disable }`} >Clear</button>
         </div>    
   

    <div className={styles.language} > 
    <h3>Choose Questions Language  </h3>
    <Toggle toggle={language ===LangMode.GEO? true: false } onToggled={toggleHandler} />
    </div>
   <FileUpload/>
    <button className={`${styles.form__button} ${buttonInfo.disable  ? styles.disable: '' }`}  disabled={buttonInfo.disable }  type="submit" > {buttonInfo.text}</button>
    </form>)
}

export default VocabularyForm