import React from 'react';
import {RiBook2Fill} from "@react-icons/all-files/ri/RiBook2Fill";
import styles from './lessonChooser.module.css'
import Lesson from '../../ui/lesson/lesson-card'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducer";
import {vocabularyActions} from "../../store/vocabulary-slice";
import {RiBookOpenFill} from "@react-icons/all-files/ri/RiBookOpenFill";
import ReactDom from 'react-dom'
import { PropsFn } from '../../models';

const LessonChooser: React.FC<{showLessonsClicked: PropsFn, showLessons: boolean}> = (props) => {
    const dispatch = useDispatch()

 
    const lessons = useSelector((state: RootState)=> state.vocabulary.stages)
    const language = useSelector((state: RootState)=> state.settings.language)
   const lessonChoseHandler =  (key: number)=>{
        dispatch(vocabularyActions.choseLesson(key))
    }
    const continueHandler =()=>{
        console.log('clicked')
         props.showLessonsClicked()
        dispatch(vocabularyActions.lessonsSubmitted(language))
    }

    const lessonsData =Object.keys(lessons).map((key)=>{
        const lesson = lessons[Number(key)]
        return lesson?.lesson? <Lesson lessonClicked={()=> lessonChoseHandler(Number(key))} active={lesson.active} key={key}  lessonName={lesson.lesson} />: ''
    })

    const Overlay: React.FC<{overlayClicked: PropsFn}> = (prop) => {
        return  <div onClick={prop.overlayClicked} className={`${styles.overlay} ${props.showLessons? styles.overlay__hide: ''} `}  > </div>
    }



    return (
        <div className={`${styles.stages} `}>
            {  ReactDom.createPortal(<Overlay overlayClicked={props.showLessonsClicked} />, document.getElementById('overlay-root') as HTMLElement )}
            <div className={styles.book} >
                { props.showLessons? <RiBook2Fill onClick={props.showLessonsClicked} size='2em' className={styles.stages_icon}/>:
                <RiBookOpenFill  onClick={props.showLessonsClicked} size='2em' className={styles.stages_icon} />}
            </div>
            <div className={`${styles.stages__modal} ${ !props.showLessons? styles.stages__modal__show: ''}`}>
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