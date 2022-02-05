import  styles from './vocabularyForm.module.css'
import  React, {useRef, useState, useEffect} from 'react'
import Toggle from '../../ui/toggle/toggle'

 const VocabularyForm: React.FC<{processData: (data: string, language: string)=> void}> = (props)=>{
    const textAreaInput = useRef<HTMLTextAreaElement>(null)
    const [buttonInfo, setButtonInfo]  = useState<{text: string, disable: boolean}>({
        text: "Start Processing",
        disable: true
    })
    const [language, setLanguage]   = useState<string>('Geo')
    const [words, setWords] = useState<string>('')
        useEffect(()=>{
            const inputData = localStorage.getItem('data')
            const lang = localStorage.getItem('lang')
            if(inputData && inputData !== "undefined"){

                const data: string = JSON.parse(inputData);
                  setWords(data);
                  setButtonInfo({...buttonInfo,disable: false }  )
                
            }
            console.log(lang ==="Eng")
            if(lang){
                let parsedLang = JSON.parse(lang)
                console.log(parsedLang === 'Eng')
                if(parsedLang === 'Eng'){
                    setLanguage('Eng')
                   
                    console.log('changed')
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
                    console.log(language)
                props.processData(textAreaInput.current?.value, language)
               
              
            }
            }, 2000)
           
        
    }
    const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
     
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
     const toggleHandler =(_toggled: boolean)=>{
        if(language !=='Eng'){
            setLanguage('Eng')
        }else{
            setLanguage('Geo')
        }
     }

   return ( <form  onSubmit={submitHandler} className={styles.form} >
     <h5 className={styles.form__heading} >Please put vocabulary</h5>    
    <textarea value={words}  onChange={changeHandler}  ref={textAreaInput} className={styles.form__input}  />
    <div className={styles.language} > 
    <h3>Choose Questions Language  </h3>
    <Toggle toggle={language ==='Geo'? true: false } onToggled={toggleHandler} />
    </div>
    <button className={`${styles.form__button} ${buttonInfo.disable  ? styles.disable: '' }`}  disabled={buttonInfo.disable }  type="submit" > {buttonInfo.text}</button>
    </form>)
}

export default VocabularyForm