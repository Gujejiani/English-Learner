import axios, {  } from "axios";
import { LangMode } from "../models";
import DataModifier from "../utils/DataModifier";
import { StateDispatch } from "./reducer";
import { vocabularyActions } from "./vocabulary-slice";

export const PDF_EXTRACT_URL = 3>5? 'http://localhost:3001/extract-text': 'https://pdf-extractor-lty1.onrender.com/extract-text';

export const GET_PDF_FILE_NAMES = 3>5? 'http://localhost:3001/pdf-files': 'https://pdf-extractor-lty1.onrender.com/extract-text';


export const sendPdfData = (pdfFile: File | null, language: LangMode, selectedPdfName: string) => {
  return async (dispatch: StateDispatch) => {
    dispatch(vocabularyActions.addVocabulary());


    console.log('we started')
    const formData = new FormData();
    if(!pdfFile){
    formData.append('pdfName', selectedPdfName);
    }else {
      formData.append('pdfFile', pdfFile);
    }

    axios.post<string>(PDF_EXTRACT_URL, formData)
      .then((res: any) => {
        // Cancel the other request
        console.log(res)
        const done = (data: { updatedWords: string[], firstWord: Array<string>, title: string }) => {
          dispatch(vocabularyActions.resetVocabularyState());
          dispatch(vocabularyActions.addVocabularySuccess(data.updatedWords));

          let questIndex = language === LangMode.GEO ? 1 : 0;
          let answerIndex = language === LangMode.GEO ? 0 : 1;

          dispatch(vocabularyActions.changeWord({ question: data.firstWord[questIndex], answer: data.firstWord[answerIndex] }));
        };

        // Modify pdf string to array
        DataModifier.modifyWords(res.data, done);

        DataModifier.splitByStages(res.data);
        dispatch(vocabularyActions.addVocabularyByStages(res.data));
      })
      .catch((err) => {
       
          console.log(err);
          dispatch(vocabularyActions.addVocabularyFail());
        
      });
  };
};


export const getPdfFiles = () => {
  return async (dispatch: StateDispatch) => {
    axios.get(GET_PDF_FILE_NAMES)
      .then((res) => {
        if (res.data) {
         

          dispatch(vocabularyActions.setPdfFiles(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}