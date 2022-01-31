import  styles from './vocabularyForm.module.css'
import  React, {useRef, useState} from 'react'
 const VocabularyForm: React.FC<{processData: (data: string)=> void}> = (props)=>{
    const textAreaInput = useRef<HTMLTextAreaElement>(null)
    const [buttonInfo, setButtonInfo]  = useState<{text: string, disable: boolean}>({
        text: "Start Processing",
        disable: false
    })

    const submitHandler =(e: React.FormEvent)=>{
        e.preventDefault()
      
            setButtonInfo({
                text: "Processing...",
                disable: true
            })
            setTimeout(()=>{
                if(textAreaInput.current?.value){
                props.processData(textAreaInput.current?.value)
            }
            }, 2000)
           
     
        console.log(textAreaInput.current?.value)
        
    } 

   return ( <form  onSubmit={submitHandler} className={styles.form} >
     <h5 className={styles.form__heading} >Please put vocabulary</h5>    
    
    <textarea ref={textAreaInput} className={styles.form__input}  />

    <button disabled={buttonInfo.disable} className={styles.form__button} type="submit" > {buttonInfo.text}</button>
    </form>)
}

export default VocabularyForm