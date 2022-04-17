import { createSlice } from "@reduxjs/toolkit"


const initialVocabularyState: {
     vocabulary: string[],
     words: {
         question: string,
         answer: string
     },
     loading: boolean, 
     error: boolean
    
    } = 
    {vocabulary: [], words: {question: '', answer: ''}, loading: false, error: false}

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

        removeVocabulary(){
            console.log('remove state')
        },
        addVocabularyFail(state){
            state.error =true
        }


    }
})




export const vocabularyActions = vocabularySlice.actions
export default vocabularySlice.reducer