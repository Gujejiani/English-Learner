import { createSlice } from "@reduxjs/toolkit"
import DataModifier from "../utils/DataModifier";

export interface Lesson {
    stage?: string,
    [key: number]: {
        lesson: string,
        vocabulary: string[],
        active?: boolean
    }
}

const initialVocabularyState: {
     vocabulary: string[],
     words: {
         question: string,
         answer: string,

     },
    activeLessonsKeys: number[],
    totalWordsInActiveLessons?: number,
    stages: Lesson,
    vocabularyByStages: string[]
     loading: boolean, 
     error: boolean
    
    } = 
    {vocabulary: [], words: {question: '', answer: ''}, activeLessonsKeys: [], stages: {}, vocabularyByStages: [], loading: false, error: false}

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
        },
        choseLesson(state, action: {payload: number}) {
            state.stages[action.payload].active = !state.stages[action.payload].active

        },
        lessonsSubmitted(state){
            const updatedVocabulary: string[]  = []
            const activeLessonKeys: number[] = []
          Object.entries(state.stages).forEach(([key, _value])=> {
              // console.log(key)
              // console.log(value)
              const lesson = state.stages[+key]
              if(lesson?.active){
                  if(!updatedVocabulary.length){
                      updatedVocabulary.push(...lesson.vocabulary)
                  }

                  activeLessonKeys.push(+key)
              }
          })
            state.vocabularyByStages = updatedVocabulary
            state.activeLessonsKeys =activeLessonKeys
            console.log(updatedVocabulary)
        }
    }
})




export const vocabularyActions = vocabularySlice.actions
export default vocabularySlice.reducer