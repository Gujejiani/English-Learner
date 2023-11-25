import axios, {  } from "axios";
import { LangMode } from "../models";
import DataModifier from "../utils/DataModifier";
import { StateDispatch } from "./reducer";
import { vocabularyActions } from "./vocabulary-slice";

export const PDF_EXTRACT_URL = 'https://pdf-extractor-lty1.onrender.com/extract-text';

export const sendPdfData = (pdfFile: File, language: LangMode) => {
  return async (dispatch: StateDispatch) => {
    dispatch(vocabularyActions.addVocabulary());

    const formData = new FormData();
    formData.append('pdfFile', pdfFile);

    // Create a cancel token source
    const cancelTokenSource = axios.CancelToken.source();

    // Attach the cancel token to each request
    const request1 = axios.post<string>(PDF_EXTRACT_URL, formData, { cancelToken: cancelTokenSource.token });
 
  
         /**
          * we using free server hosting so it sleeps for some time and then it wakes up, so we need to send request twice
          * first request wakes up server and second request gets data
          */
    const request2 = new Promise<string>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
      

        axios.post<string>(PDF_EXTRACT_URL, formData, { cancelToken: cancelTokenSource.token })
          .then((res) => resolve(res.data))
          .catch((err) => {
            if (axios.isCancel(err)) {
              console.log('Request canceled:', err.message);
            } else {
              console.log(err);
              dispatch(vocabularyActions.addVocabularyFail());
              reject(err);
            }
          });
      }, 4000); // 4-second delay


      request1.then(() => clearTimeout(timeoutId));
    });


    // Use Promise.race to resolve with the result of the first completed request
    Promise.race([request1, request2])
      .then((res: any) => {
        // Cancel the other request
        cancelTokenSource.cancel('Request canceled because another request succeeded');

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
        if (axios.isCancel(err)) {
          console.log('Request canceled:', err.message);
        } else {
          console.log(err);
          dispatch(vocabularyActions.addVocabularyFail());
        }
      });
  };
};
