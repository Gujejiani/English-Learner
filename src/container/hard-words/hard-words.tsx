import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../../components/dashboard/dashboard";
import { RootState } from "../../store/reducer";
import { vocabularyActions } from "../../store/vocabulary-slice";
import Button from "../../ui/button/button";
import styles from "./hard-words.module.css";

export const HardWordsContainer: React.FC = () => {
  const hardWordss = useSelector(
    (state: RootState) => state.vocabulary.hardWords,
  );
  const language = useSelector((state: RootState) => state.settings.language);
  const [shakeButton, setShakeButton] = useState(false);
  const hardWordQuestion = useSelector(
    (state: RootState) => state.vocabulary.hardWordsQuestion,
  );
  const [hardWords, setHardWords] = useState(hardWordss);

  const dispatch = useDispatch();
  const [addHardWordMode, setAddHardWordMode] = useState(false);
  const [englishWord, setEnglishWord] = useState('');
  const [georgianWord, setGeorgianWord] = useState('');

  const [showDashboard, setShowDashboard] = useState(false);
  const startHandler = () => {
    setShowDashboard(true);
    dispatch(vocabularyActions.hardWordsPracticeStart(language));
  };
 const addCustomWordHandler =()=>{
 
  const word = `${englishWord} - ${georgianWord}`

  dispatch(vocabularyActions.addCustomHardWord(word))
  setEnglishWord('');
  setGeorgianWord('');
  setAddHardWordMode(false)

  
  }
  useEffect(()=>{
    setShakeButton(true)
   const timer = setTimeout(()=>{
      setShakeButton(false)
    }, 1000)
   return   ()=> clearTimeout(timer)
  }, [hardWords])

  
  const changeAddHardWordsMode =()=>{
   setAddHardWordMode(!addHardWordMode)
  }
  useEffect(() => {
    dispatch(vocabularyActions.changeActiveWordsIndex(0));
  }, []);
  useEffect(() => {
    setHardWords(hardWordss);
  }, [hardWordss]);

  const onChangeGeorgianWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setGeorgianWord(inputValue);
    
  };
  
  const onChangeEnglishWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnglishWord(e.target.value);
  }

  const HardWordsPractice = !showDashboard ? (
    <div className={styles.hard__words__start}>
    
      <h3>
        You have <span style={{ color: "#8B0000" }}> {hardWords.length}</span>{" "}
        hard {hardWords.length > 1 ? "words" : "word"} to practice
      </h3>
      {
        addHardWordMode?   <div className={styles.addHardWords} >
        <input onChange={onChangeEnglishWord}  placeholder="English Word" className={styles.addHardWords_input} ></input>
        <input onChange={onChangeGeorgianWord} placeholder="Georgian Word" className={styles.addHardWords_input} ></input>

    </div>: ''
      }
     
      {
       ! addHardWordMode?    <Button styles={{backgroundColor: '#8B0000', marginBottom: '8px',}} hardWords={true}  onClick={changeAddHardWordsMode} directionButton={true}>
        Add Custom Hard Word
      </Button>: 
      
        <Button  disabled={(englishWord && georgianWord) ? false: true} styles={{backgroundColor: '#232142', marginBottom: '8px',}} hardWords={true}  onClick={addCustomWordHandler} directionButton={true}>
        Save Word
      </Button>
      }
    
      
    <div className={shakeButton? styles.element_to_shake: ''} > <Button disabled={hardWords.length===0} hardWords={true} onClick={startHandler} directionButton={true}>
       { hardWords.length ? 'Start Practicing hard words' : 'Please Add Hard Words'}
      </Button> </div>
    </div>
  ) : (
    <Dashboard
      hardWords={true}
      vocabularyQuestion={hardWordQuestion}
      vocabulary={hardWords}
    />
  );

  return     <div className={styles.hard__words__in}>{HardWordsPractice}</div>
};

export default HardWordsContainer;
