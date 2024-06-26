import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import { engAlphabetToGeo } from "../../utils/engAlphToGeo";
import { speak } from "../../utils/voice";
import Controller from "../wordsNavController/controller";
import Sound from "../sound/sound.module";
import { LangMode, Move } from "../../models";
import Question from "../question/question";
import LessonChooser from "../lessonChooser/lessonChooser";
import { vocabularyActions } from "../../store/vocabulary-slice";
import DataModifier from "../../utils/DataModifier";
import { buttonController } from "../../utils/buttonController";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducer";
import Favorites from "../favourites/favourites";
import { determineIfSelectedAsHardWord } from "../../utils/utils";
import { useHistory } from "react-router-dom";
import MyInput from "../../ui/input/input";
import Animation from "../../ui/animation/animation";

import { RiExchangeLine } from "@react-icons/all-files/ri/RiExchangeLine";

const Dashboard: React.FC<{
  vocabulary: string[];
  vocabularyQuestion: {
    question: string;
    answer: string;
  };
  hardWords?: boolean;
  children?: any;
}> = (props) => {
  const [show, setShow] = useState<boolean>(false);
  const [sound, setSound] = useState<boolean>(true);
  const [repeatCount, setRepeatCount] = useState<number>(3);
  const [repeatMode, setRepeatMode] = useState<boolean>(false);

  const [enableSound, setEnableSound] = useState<boolean>(false)

  const [spoken, setSpoken] = useState<string>("");
  const history = useHistory();

  const [hintIndex, setHintIndex] = useState(0);
  const [showLessons, setShowLessons] = useState<boolean>(true);

  const [wordChanged, setWordChanged] = useState(0);

  const language = useSelector((state: RootState) => state.settings.language);
  const dispatch = useDispatch();

  const hardWords = useSelector(
    (state: RootState) => state.vocabulary.hardWords,
  );

  const lesson = useSelector(
    (state: RootState) => state.vocabulary.lessonTitle,
  );

  const activeLessons = useSelector(
    (state: RootState) => state.vocabulary.activeLessonsKeys,
  );

  const activeWordsIndex =
    useSelector((state: RootState) => state.vocabulary.activeWordsIndex) ?? 0;
  const [buttons, setButtons] = useState<{
    prevDisable: boolean;
    nextDisable: boolean;
  }>({ prevDisable: true, nextDisable: false });
  useEffect(() => {
    if (!activeLessons.length) {
      // it won't be visible
      setShowLessons(false);
    } else {
      activeLessons.forEach((key) => {
        dispatch(vocabularyActions.choseLesson(key));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!props.hardWords) {
      setButtons({
        prevDisable: activeWordsIndex === 0 ? true : false,
        nextDisable:
          props.vocabulary.length - 1 === activeWordsIndex ? true : false,
      });
    }

    if (props.vocabulary.length === 1) {
      setButtons({
        prevDisable: true,
        nextDisable: true,
      });
    }
 

    if (!props.vocabulary.length) {
      history.push("/form");
    }
  }, [props.vocabulary, history]);

  const changeWord = (direction: string, hardWordRemoved?: boolean, jumpToIndex?: number) => {
    setWordChanged((prev) => {
      return (prev = prev + 1);
    });

    let wordIndex = jumpToIndex ?? activeWordsIndex;

    // console.log(wordIndex, 'wordIndex')
    setHintIndex(0);
    let currentIndex: number;
    if (direction === Move.NEXT) {
      currentIndex = buttonController(
        { index: wordIndex, next: true, words: props.vocabulary },
        buttons,
        setButtons,
      );
    } else {
      currentIndex = buttonController(
        {
          index: hardWordRemoved ? wordIndex - 1 : wordIndex,
          next: false,
          words: props.vocabulary,
        },
        buttons,
        setButtons,
      );
    }
    let currentWord = DataModifier.getWord(props.vocabulary, currentIndex);

    let questIndex = language === LangMode.GEO ? 1 : 0;
    let answerIndex = language === LangMode.GEO ? 0 : 1;
    if (!props?.hardWords) {
      dispatch(
        vocabularyActions.changeWord({
          question: currentWord[questIndex],
          answer: currentWord[answerIndex],
        }),
      );
    } else {
      dispatch(
        vocabularyActions.changeHardWord({
          question: currentWord[questIndex],
          answer: currentWord[answerIndex],
        }),
      );
    }

    dispatch(vocabularyActions.changeActiveWordsIndex(currentIndex));
  };

  const showLessonsHandler = () => {
    if(!props.hardWords){
      setShowLessons((prev) => !prev);
    }else {
      // remove word from hard words
     // hardWordAdded()
      // add word to learned
 
      const word = {
        english: language === LangMode.ENG? props.vocabularyQuestion.question: props.vocabularyQuestion.answer,
        georgian:  language ===LangMode.ENG ? props.vocabularyQuestion.answer: props.vocabularyQuestion.question,
      }
    dispatch(vocabularyActions.learnedWordAdded(word))
      
    }
   
  };

  useEffect(() => {
    /**
     * @description to  not speak every word when user changes word fast
     */
    let timeOut: NodeJS.Timeout;
    if (language !== LangMode.GEO && sound && enableSound) {
      timeOut = setTimeout(() => {
        setSpoken(props.vocabularyQuestion.question);
        if (spoken !== props.vocabularyQuestion.question) {
          speak(props.vocabularyQuestion.question);
        }
      }, 1000);
    }else {
      setEnableSound(true)
    }
    return () => {
      setEnableSound(false)
      clearTimeout(timeOut)
    };
  }, [language, props.vocabularyQuestion.question, sound, spoken]);

  const showHandler = (turnOnRepeat?: boolean) => {
    if (turnOnRepeat) {
      setRepeatMode(true);
    }

    if (repeatCount === 0) {
      setRepeatCount(3);
    }

    setShow((current) => {
      return !current;
    });
    setHintIndex(0);
    if (language === LangMode.GEO && !show && sound) {
      speak(props.vocabularyQuestion.answer);
    }
  };

  const changeHandler = (direction: string, hardWordRemoved?: boolean): any => {
    setShow(false);
    changeWord(direction, hardWordRemoved);
    setRepeatMode(false);
    setRepeatCount(3);
  };

  const soundHandler = () => {
    setSound((prev) => {
      return !prev;
    });
  };

  const hardWordAdded = () => {
    if (props.hardWords) {
      const hardWordRemoved = props.vocabulary.findIndex((word) =>
        word.includes(props.vocabularyQuestion.question),
      );

      if (hardWordRemoved !== -1 && props.vocabulary.length > 1) {
        if (activeWordsIndex === 0) {
          changeHandler(Move.NEXT);
        } else {
          changeHandler(Move.PREV);
        }
      }
    }
    dispatch(
      vocabularyActions.hardWordAdded(props.vocabularyQuestion.question),
    );
  };

  function keyDownHandler(event: any) {
    switch (event.key) {
      case "ArrowRight":
        if (!buttons.nextDisable) {
          changeHandler(Move.NEXT);
        }

        break;
      case "ArrowLeft":
        if (!buttons.prevDisable) {
          changeHandler(Move.PREV);
        }
        break;
      case "Enter":
        event.preventDefault();
        showHandler();
        break;
      default:
        break;
    }
    if (event?.keyCode === 32) {
      // event.preventDefault()
      // showHandler()
    }
  }
  function removeParentheses(text: string) {
    // Define a regular expression pattern to match the content inside parentheses
    var pattern = /\([^)]*\)/g;

    // Use the replace() method to replace the matched pattern with an empty string
    var cleanedText = text.replace(pattern, "");

    return cleanedText;
  }

  const handleHintShow = () => {
    setHintIndex((prev) => {
      return prev + 1;
    });
  };

  const successHandler = () => {
    if (repeatCount !== 0) {
      setRepeatCount((prev) => {
        return prev - 1;
      });
      setShow(false);
    }
    if (!repeatMode || repeatCount === 1) {
      setRepeatMode(false);
      changeHandler(Move.NEXT);
    }
  };
  const handleShuffle =()=>{
    dispatch(vocabularyActions.shuffleWords())
    changeWord(Move.PREV, false, 1)
   
  
  }
  return (
    <div onKeyDown={keyDownHandler} className={styles.card}>
      {!props.hardWords ? (
        <div className={styles.card__book}>
          {" "}
          <LessonChooser
            showLessons={showLessons}
            showLessonsClicked={showLessonsHandler}
          />
        </div>
      ) : (
        ""
      )}
      <Sound sound={sound} soundClicked={soundHandler} />
      <div onClick={handleShuffle} className={styles.shuffle} ><RiExchangeLine size="25px" /></div>
      {repeatMode && language === LangMode.GEO ? (
        <Animation
          wordChangeCount={wordChanged}
          onShowHint={handleHintShow}
          repeatMode={true}
          repeatCount={repeatCount}
        />
      ) : (
        ""
      )}

      {(showLessons || props.hardWords) &&
      !repeatMode &&
      language === LangMode.GEO ? (
        <div className="animation__remind">
          <Animation
            wordChangeCount={wordChanged}
            onShowHint={handleHintShow}
          />
        </div>
      ) : (
        ""
      )}

      <span className={styles.count}>
        ({activeWordsIndex + 1}/{props.vocabulary.length})
      </span>
      <Question lesson={props.hardWords ? "Hard Words" : lesson}>
        {language === LangMode.GEO
          ? engAlphabetToGeo(props.vocabularyQuestion.question)
          : props.vocabularyQuestion.question}
      </Question>

      <div className={styles.card__answer}>
        {/* <div className={styles.learned} >
        <AiOutlineFileDone size="1.8em" color="yellow" />
        </div> */}
   
        
        <Favorites
          hardWord={determineIfSelectedAsHardWord(
            hardWords,
            props.vocabularyQuestion.answer,
          )}
          addedToHardWords={hardWordAdded}
        />

        {language === LangMode.ENG ? (
          <label
            onClick={() => showHandler()}
            className={`${styles.card__translate}  ${
              show ? styles.card__show : styles.card__show__hide
            }`}
          >
            {" "}
            {show ? "" : "just place holder stuff"}{" "}
            {show ? engAlphabetToGeo(props.vocabularyQuestion.answer) : ""}
          </label>
        ) : (
          <MyInput
            repeatCount={repeatCount}
            resetHintIndex={() => setHintIndex(0)}
            hintIndex={hintIndex}
            onSuccess={successHandler}
            playSound={sound}
            wordChangeCount={wordChanged}
            showAnswer={showHandler}
            show={show}
            answerWord={removeParentheses(
              props.vocabularyQuestion.answer?.replace(/\s{2,}/g, " ").trim(),
            )}
          />
        )}
        <Controller
          hardWords={props.hardWords}
          buttSettings={buttons}
          insertButtonStyles={{backgroundColor: '#008080'}}
          showClicked={() => showHandler(true)}
          prev={() => changeHandler(Move.PREV)}
          next={() => changeHandler(Move.NEXT)}
          changeWords={showLessonsHandler}
        />
      </div>
    </div>
  );
};

export default Dashboard;
