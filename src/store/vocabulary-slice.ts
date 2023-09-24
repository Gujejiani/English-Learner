import { createSlice } from "@reduxjs/toolkit"
import { LangMode } from "../models";
import DataModifier from "../utils/DataModifier";
import { determineTitle } from "../utils/utils";
import { FireStore } from "../firestore/firestore.service";

export interface Lesson {
    stage?: string,
    [key: number]: {
        lesson: string,
        vocabulary: string[],
        active?: boolean
    }
}

 export interface Question {
    question: string,
    answer: string,

}

const initialVocabularyState: {
     vocabulary: string[],
     words: Question,
     hardWordsQuestion: Question,
    hardWords:  string[],
    lessonTitle: string,
    activeLessonsKeys: number[],
    totalWordsInActiveLessons?: number,
    stages: Lesson,
    vocabularyByStages: string[]
     uploaded: boolean, 
     error: boolean
    
    } = 
    {vocabulary: [], words: {question: '', answer: ''},hardWordsQuestion: {question: '', answer: ''},  hardWords:  [],lessonTitle: '', activeLessonsKeys: [], stages: {}, vocabularyByStages: [], uploaded: false, error: false}

/**
 * we can't accidentally mutate state in redux toolkit, because redux toolkit uses Immer reducer
 */
const vocabularySlice =createSlice({
    name: 'vocabulary',
    initialState:initialVocabularyState,
    reducers: {

        addVocabulary(state){
            state.uploaded =false
        },
        addVocabularySuccess(state, action:{payload: string[]}){
        state.uploaded =true
        state.vocabulary =DataModifier.removeGeorgianWords(action.payload)
          
       
       
        },
        changeWord(state, action: {payload: {question: string, answer: string}}){
            state.words= action.payload
         
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
            state.uploaded =true      
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
                // console.log(activeLessonKeys, state.stages, state.lessonTitle, state.words.question)
                if(found){
                    state.lessonTitle =title
                }
            }else {
                    // 3) if not we have to set first question from all vocabulary and reset title
                    state.lessonTitle = 'Guess Word'
                const word = DataModifier.getWord(state.vocabulary, 0)
                state.words ={ question: word[questIndex],  answer: word[answerIndex] }
            }
        },
        hardWordAdded(state, action: {payload: string}){
            let vocWords =state?.vocabularyByStages?.length ? state?.vocabularyByStages: state.vocabulary
            const words = vocWords.find(vocWords=> vocWords.includes(action.payload))

            const alreadyAdded = state.hardWords.findIndex(word=> word.includes(action.payload))
            // console.log(alreadyAdded)
            if(words && alreadyAdded  === -1){
                state.hardWords = [...state.hardWords, words]
            }else {
                console.log('removed')
                const hardWordsCopy = [...state.hardWords]
                hardWordsCopy.splice(alreadyAdded,  1)
                state.hardWords = hardWordsCopy
                
            }
            FireStore.saveDataInCollection(state.hardWords)

            localStorage.setItem('hardWords', JSON.stringify(state.hardWords))
         
        },
        hardWordsPracticeStart(state, action:{payload: LangMode} ){
            let questIndex = action.payload ===LangMode.GEO? 1: 0
            let answerIndex =  action.payload===LangMode.GEO? 0: 1


         
            const word = DataModifier.getWord(state.hardWords, 0)
            state.hardWordsQuestion ={ question: word[questIndex],  answer: word[answerIndex] }
        },
        changeHardWord(state, action: {payload: {question: string, answer: string}}){
            state.hardWordsQuestion= action.payload
         
            

        },
        insertHardWords(state, action: {payload: string[]}){
            state.hardWords = action.payload
        }
       


       
    }
})




export const vocabularyActions = vocabularySlice.actions
export default vocabularySlice.reducer