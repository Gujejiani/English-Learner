import React from "react";
import styles from "./lesson-card.module.css";
import { PropsFn } from "../../models";
const Lesson: React.FC<{
  lessonName: string;
  active?: boolean;
  lessonClicked: PropsFn;
}> = (props) => {
  return (
    <button
      onClick={props.lessonClicked}
      className={`${styles.button}  ${
        props.active ? "" : styles.lesson__inactive
      }`}
     
    >
      {props.lessonName}
    </button>
  );
};

export default Lesson;
