
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Dashboard from '../../components/dashboard/dashboard'
import { RootState } from '../../store/reducer'
import { vocabularyActions } from '../../store/vocabulary-slice'
import Button from '../../ui/button/button'
import styles from './hard-words.module.css'




export const HardWordsContainer:  React.FC =()=>{
    const hardWordss = useSelector((state:RootState)=> state.vocabulary.hardWords)
    const language = useSelector((state: RootState)=> state.settings.language)
    const hardWordQuestion = useSelector((state: RootState)=> state.vocabulary.hardWordsQuestion)
    const dispatch = useDispatch()

    const [showDashboard, setShowDashboard] = useState(false)
    const startHandler =()=>{
    setShowDashboard(true)
    dispatch(vocabularyActions.hardWordsPracticeStart(language))
    }
    const [hardWords, setHardWords] = useState(hardWordss)

    useEffect(()=>{
        setHardWords(hardWordss)
    }, [hardWordss])

    const HardWordsPractice = !showDashboard? <div  className={styles.hard__words__start}  >
            <h3> <span style={{'color': '#2ea44f'}} >{hardWords.length}</span>  hard words to practice</h3>
            <Button hardWords={true} onClick={startHandler} directionButton={true}  >Start Practicing hard  words</Button>
        </div>:
        <Dashboard hardWords={true} vocabularyQuestion={hardWordQuestion} vocabulary={hardWords}/>


    return   !hardWords?.length  ? <div className={styles.hard__words}>No Marked  Hard Words yet...</div>:
    <div className={styles.hard__words__in} >   

       { 
       HardWordsPractice
    }
    
           </div>
}


export default HardWordsContainer