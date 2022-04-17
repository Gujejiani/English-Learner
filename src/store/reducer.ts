


import { configureStore} from '@reduxjs/toolkit'

import { useDispatch } from 'react-redux'
import vocabularyReducer from './vocabulary-slice';
import settingsReducer from './settings-slice';



/**
 * configureStore will merge all reducers for as => quite nice doesn't it?
 */
const store = configureStore({
    reducer: {vocabulary: vocabularyReducer, settings: settingsReducer} //we can use object if we have multiple 
})

export type StateDispatch  = typeof store.dispatch



export const useStateDispatch  = ()=> useDispatch<StateDispatch>()

export type RootState = ReturnType<typeof store.getState>;






export default store