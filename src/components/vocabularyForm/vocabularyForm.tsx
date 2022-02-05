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
            if(inputData && inputData !== "undefined"){

                const data: string = JSON.parse(inputData);
                  setWords(data);
                  console.log('hehehe')
            }
        }, [])

    const submitHandler =(e: React.FormEvent)=>{
        e.preventDefault()
        localStorage.setItem('data', JSON.stringify(`${textAreaInput.current?.value}`))
            setButtonInfo({
                text: "Processing...",
                disable: false
            })
            setTimeout(()=>{
                if(textAreaInput.current?.value){
                props.processData(textAreaInput.current?.value, language)
                console.log(textAreaInput.current.value)
              
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
        console.log(e.target.value)
     }
     const toggleHandler =(toggled: boolean)=>{
        if(!toggled){
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
    <Toggle onToggled={toggleHandler} />
    </div>
    <button className={`${styles.form__button} ${buttonInfo.disable  ? styles.disable: '' }`}  disabled={buttonInfo.disable }  type="submit" > {buttonInfo.text}</button>
    </form>)
}

export default VocabularyForm