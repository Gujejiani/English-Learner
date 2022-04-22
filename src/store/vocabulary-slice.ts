import { createSlice } from "@reduxjs/toolkit"
import DataModifier from "../utils/DataModifier";

export interface Lesson {
    stage?: string,
    [key: number]: {
        lesson: string,
        vocabulary: string[],
    }
}

const initialVocabularyState: {
     vocabulary: string[],
     words: {
         question: string,
         answer: string
     },
    stages: Lesson,

     loading: boolean, 
     error: boolean
    
    } = 
    {vocabulary: [], words: {question: '', answer: ''}, stages: {}, loading: false, error: false}

/**
 * we can't accidentally mutate state in redux toolkit, because redux toolkit uses Immer reducer
 */
const vocabularySlice =createSlice({
    name: 'vocabulary',
    initialState:initialVocabularyState,
    reducers: {

        addVocabulary(state){
            state.loading =true
        },
        addVocabularySuccess(state, action:{payload: string[]}){
        state.loading =false
        console.log(action)
        state.vocabulary = action.payload
        },
        changeWord(state, action: {payload: {question: string, answer: string}}){
            state.words= action.payload
        },

        removeVocabulary(state){
            console.log('remove state')
            state.vocabulary = [];
        },
        addVocabularyFail(state){
            state.error =true
        },

        addVocabularyByStages(state, action: {payload: string}){

            state.stages = DataModifier.splitByStages(action.payload)
        }


    }
})




export const vocabularyActions = vocabularySlice.actions
export default vocabularySlice.reducer