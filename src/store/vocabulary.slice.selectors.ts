import { RootState } from "./reducer"

export const selectVocabulary =(state: RootState)=> {
    const byStages = state.vocabulary.vocabularyByStages;
    const allWords = state.vocabulary.vocabulary;
    if(byStages?.length){
        return byStages
    }else{
        return allWords
    }
}