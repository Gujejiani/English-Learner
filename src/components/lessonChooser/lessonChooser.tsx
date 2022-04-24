import React, {useState} from 'react';
import {RiBook2Fill} from "@react-icons/all-files/ri/RiBook2Fill";
import styles from './lessonChooser.module.css'
import Lesson from '../../ui/lesson/lesson-card'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducer";
import {vocabularyActions} from "../../store/vocabulary-slice";
import {RiBookOpenFill} from "@react-icons/all-files/ri/RiBookOpenFill";
const LessonChooser: React.FC = () => {
    const dispatch = useDispatch()

    const [continued, setContinued] = useState(false);
    const lessons = useSelector((state: RootState)=> state.vocabulary.stages)
    const language = useSelector((state: RootState)=> state.settings.language)
   const lessonChoseHandler =  (key: number)=>{
        dispatch(vocabularyActions.choseLesson(key))
    }
    const continueHandler =()=>{
        console.log('clicked')
        setContinued(prev=> !prev)
        dispatch(vocabularyActions.lessonsSubmitted(language))
    }

    const showLessonsHandler =() => {
        setContinued(prev=> !prev)
    }
    const lessonsData =Object.keys(lessons).map((key)=>{
        const lesson = lessons[Number(key)]
        return lesson?.lesson? <Lesson lessonClicked={()=> lessonChoseHandler(Number(key))} active={lesson.active} key={key}  lessonName={lesson.lesson} />: ''
    })

    return (
        <div className={`${styles.stages} `}>
            <div className={styles.book} >
                { continued? <RiBook2Fill onClick={showLessonsHandler} size='2em' className={styles.stages_icon}/>:
                <RiBookOpenFill  onClick={showLessonsHandler} size='2em' className={styles.stages_icon} />}
            </div>
            <div className={`${styles.stages__modal} ${ !continued? styles.stages__modal__show: ''}`}>
                <h3 className={styles.modal__title}>Choose Lesson</h3>
                <div  className={styles.lessons}>

                    {lessonsData}


                </div>

                <button onClick={continueHandler} className={`${styles.button_21}`} >Continue</button>
            </div>
        </div>
    );
}

export default LessonChooser;