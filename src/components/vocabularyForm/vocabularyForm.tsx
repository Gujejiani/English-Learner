import styles from "./vocabularyForm.module.css";
import React, { useEffect, useState } from "react";
// import Toggle from "../../ui/toggle/toggle";
import FileUpload from "../../container/fileUpload/fileUpload";
import { LangMode } from "../../models/index";
import { sendPdfData } from "../../store/vocabulary-effects";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { settingsActions } from "../../store/settings-slice";
import { useHistory } from "react-router-dom";
import englishImg from '../../assets/english.png'
import georgianImg from '../../assets/georgian.png'


const VocabularyForm: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [pdfFile, setPdfFile] = useState<File>();
  const uploaded = useSelector((state: RootState) => state.vocabulary.uploaded);
  const language = useSelector((state: RootState) => state.settings.language);
  const [processing, setProcessing] = useState<boolean>(false);
  const [selectedPdfName, setSelectedPdfName] = useState<string>('');
  const pdfs = useSelector((state: RootState) => state.vocabulary.pdfFileNames);
  
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(pdfFile)

    if (!pdfFile && !selectedPdfName) {
      return;
    }
    setProcessing(true);

    dispatch(sendPdfData( pdfFile??null, language, selectedPdfName));
  };

  const toggleHandler = (lang: LangMode) => {
    if(lang === language){
      dispatch(settingsActions.changeLanguage());
    }
   
  };

  const pdfHandler = (file: File) => {
    setPdfFile(file);
    setProcessing(false);
    console.log("ended success");
  };

  useEffect(() => {
    if (uploaded && (pdfFile || selectedPdfName)) {
      history.push("dashboard");
      setPdfFile(undefined);
      setProcessing(false);
    }
  }, [uploaded]);
  const selectPdfHandler =(pdf: string)=>{
  
    setSelectedPdfName(pdf)
  }
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <h5 className={styles.form__heading}>Please Upload Your Vocabulary</h5>

      <FileUpload fileUploaded={pdfHandler} />
  
      <div className={styles.language}>
        <h3>Which Language to be hidden? </h3>
        {/* <Toggle toggle={language === LangMode.GEO} onToggled={toggleHandler} /> */}
      </div>
      <div className={styles.languages}>
        <div onClick={()=>toggleHandler(LangMode.ENG)}  className={`${styles.languages_item} ${language===LangMode.GEO ? styles.languages_item__selected : ''}`}  >
        <div className={styles.language__item__overlay}></div>
          <div className={styles.languages_item_text} >
          <div className={`${styles.circle} ${language ===LangMode.GEO? styles.circle__selected: ''}`} ></div> 
            ENG</div>
       <img className={styles.languages_item_img} src={georgianImg}alt="flag" />
        </div>
        <div onClick={()=>toggleHandler(LangMode.GEO)}   className={`${styles.languages_item} ${language===LangMode.ENG ? styles.languages_item__selected : ''}`} >
        <div className={styles.language__item__overlay}></div>

        <img className={styles.languages_item_img} src={englishImg} alt="flag" />

        <div className={styles.languages_item_text} >
          <div className={`${styles.circle} ${language ===LangMode.ENG? styles.circle__selected: ''}`} ></div> GEO</div>
        </div>
      </div>
      <button
        style={{ position: "relative" }}
        className={`${styles.form__button} ${!pdfFile && !selectedPdfName ? styles.disable : ""}`}
        disabled={processing}
        type="submit"
      >
        {" "}
        {processing ? "Processing..." : "Start Processing"}
        {processing ? (
          <div className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        ) : (
          ""
        )}
      </button>

      <h1 className={styles.pdf_intro} >Available PDFs</h1>
      <div className={styles.pdf_container} >
     
      {
        pdfs.map((pdf, index)=>{
          return <div  onClick={()=>selectPdfHandler(pdf)}  key={index + pdf} className={`${styles.pdf_container_item} ${pdf ===selectedPdfName? styles.pdf_container_item__selected: ''}`}>
            
            <div key={index} style={{}}  >{pdf}</div>
          </div>
        })
      }
      </div>
    </form>
  );
};

export default VocabularyForm;
