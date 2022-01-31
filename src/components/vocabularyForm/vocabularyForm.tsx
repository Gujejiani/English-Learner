import  styles from './vocabularyForm.module.css'
import  React, {useRef} from 'react'
 const VocabularyForm: React.FC<{processData: (data: string)=> void}> = (props)=>{
    const textAreaInput = useRef<HTMLTextAreaElement>(null)
    const submitHandler =(e: React.FormEvent)=>{
        e.preventDefault()
        if(textAreaInput.current?.value){
            props.processData(textAreaInput.current?.value)
        }
        console.log(textAreaInput.current?.value)
        
    }

   return ( <form  onSubmit={submitHandler} className={styles.form} >
     <h5 className={styles.form__heading} >Please put vocabulary</h5>    
    
    <textarea ref={textAreaInput} className={styles.form__input}  />

    <button  className={styles.form__button} type="submit" > Start Processing</button>
    </form>)
}

export default VocabularyForm