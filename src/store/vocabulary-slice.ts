import { createSlice } from "@reduxjs/toolkit"

const initialVocabularyState: {vocabulary: string} = {vocabulary: ''}

/**
 * we can't accidentally mutate state in redux toolkit, because redux toolkit uses Immer reducer
 */
const vocabularySlice =createSlice({
    name: 'vocabulary',
    initialState:initialVocabularyState,
    reducers: {
        addVocabulary(state, action:{payload: string}){

            console.log('state updated')
            console.log(action)
        state.vocabulary = action.payload
        },
        removeVocabulary(){
            console.log('remove state')
        }


    }
})
export const vocabularyActions = vocabularySlice.actions
export default vocabularySlice.reducer