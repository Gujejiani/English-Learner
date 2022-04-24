import { createSlice } from "@reduxjs/toolkit"
import { LangMode } from "../models";
import DataModifier from "../utils/DataModifier";
import { determineTitle } from "../utils/utils";

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
    lessonTitle: string,
    activeLessonsKeys: number[],
    totalWordsInActiveLessons?: number,
    stages: Lesson,
    vocabularyByStages: string[]
     loading: boolean, 
     error: boolean
    
    } = 
    {vocabulary: [], words: {question: '', answer: ''}, lessonTitle: '', activeLessonsKeys: [], stages: {}, vocabularyByStages: [], loading: false, error: false}

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
         

            /**
             * this logic determines lesson  name
             */
             //    state.activeLessonsKeys.some(key=> {
            //        let includes = state.stages[key].vocabulary.some(voc=> voc.includes(action.payload.answer)) || state.stages[key].vocabulary.some(voc=> voc.includes(action.payload.answer))
            //         if(includes && state.lessonTitle !== state.stages[key].lesson){
            //             state.lessonTitle = state.stages[key].lesson
            //             return true
            //         }
            //    })
            if(state.activeLessonsKeys.length){
           
          let [found, title] = determineTitle(state.activeLessonsKeys, state.stages,  state.lessonTitle, action.payload.question)
           if(found){
               state.lessonTitle =title
           }
        }

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
        lessonsSubmitted(state, action: {payload: LangMode}){
            const updatedVocabulary: string[]  = []
            const activeLessonKeys: number[] = []

           // 1) union all chosen  lessons and save chosen lessons keys separately
          Object.entries(state.stages).forEach(([key, _value])=> {
            
              const lesson = state.stages[+key]
              if(lesson?.active){
             updatedVocabulary.push(...lesson.vocabulary)
                  activeLessonKeys.push(+key)
              }
          })
          let questIndex = action.payload ===LangMode.GEO? 1: 0
          let answerIndex =  action.payload===LangMode.GEO? 0: 1

            state.vocabularyByStages = updatedVocabulary
            state.activeLessonsKeys =activeLessonKeys


            // 2) if lessons were chosen we have to set first question from chosen lesson 
            if(activeLessonKeys.length){
              const word = DataModifier.getWord(state.stages[activeLessonKeys[0]].vocabulary, 0)

            

                state.words ={ question: word[questIndex],  answer: word[answerIndex] }
                let [found, title] = determineTitle(activeLessonKeys, state.stages,  state.lessonTitle, state.words.answer, true)
                console.log(activeLessonKeys, state.stages, state.lessonTitle, state.words.question)
                if(found){
                    state.lessonTitle =title
                }
            }else {
                    // 3) if not we have to set first question from all vocabulary and reset title
                    state.lessonTitle = 'Guess Word'
                const word = DataModifier.getWord(state.vocabulary, 0)
                state.words ={ question: word[questIndex],  answer: word[answerIndex] }
            }
        }
    }
})




export const vocabularyActions = vocabularySlice.actions
export default vocabularySlice.reducer