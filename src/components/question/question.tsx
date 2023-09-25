import React from "react";
import styles from "./question.module.css";

const Question: React.FC<{ lesson: string }> = (props) => {
  return (
    <div className={styles.card__question}>
      <label className={styles.card__title}>
        {!props.lesson ? "Guess Word Below" : props.lesson}
      </label>

      <label className={styles.card__word}>{props.children}</label>
    </div>
  );
};

export default Question;
