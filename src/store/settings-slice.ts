import { createSlice } from "@reduxjs/toolkit";
import { LangMode } from "../models";

const initialSettingsState: {language: LangMode.ENG | LangMode.GEO, sound: boolean} = {language: LangMode.GEO, sound: true};
const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialSettingsState,
    reducers: {
        changeLanguage(state){

            state.language =  state.language !==LangMode.ENG ? LangMode.ENG: LangMode.GEO
        },
        toggleSound(state, _action){
            state.sound = !state.sound
        }
    }
})

export const settingsActions = settingsSlice.actions
export default settingsSlice.reducer