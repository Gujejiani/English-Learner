import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "./birds.json";
import "./animation.css";
import { PropsFn } from "../../models";

export const Animation: React.FC<{
  onShowHint: PropsFn;
  wordChangeCount: number;
  repeatMode?: boolean;
  repeatCount?: number;
}> = (props) => {
  const [helpWithHint, setHelpWithHint] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [animateRepeatText, setAnimateRepeatText] = useState(false);

  const clickEvent = (e: any) => {
    if (helpWithHint) {
      props.onShowHint();
    }
  };
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setShowInfo(false);
    }, 3000);

    return () => clearTimeout(timeOut);
  }, [showInfo]);

  useEffect(() => {
    setAnimateRepeatText(true);

    const timer = setTimeout(() => {
      setAnimateRepeatText(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [props.repeatCount]);

  useEffect(() => {
    setHelpWithHint(false);
    const timeOut = setTimeout(() => {
      setHelpWithHint(true);
      setShowInfo(true);
    }, 7000);

    return () => clearTimeout(timeOut);
  }, [props.wordChangeCount]);

  return (
    <div
      className={`animation ${helpWithHint ? "show-animation" : ""} ${
        props.repeatMode ? "animation__repeat-mode" : ""
      } `}
    >
      <div
        className={`message-container ${
          props.repeatMode ? "message-container__repeat" : ""
        }`}
      >
        <div
          className={`message-bubble  ${
            showInfo || props.repeatMode ? "" : "hide"
          }`}
        >
          {!props.repeatMode ? (
            <p className="message-text ">Click Us For Hint</p>
          ) : (
            <p
              className={`message-text ${
                animateRepeatText ? "animatedMessage" : ""
              } `}
            >
              Please Repeat{" "}
              <span className="repeat-count">{props.repeatCount} </span> More{" "}
              {props.repeatCount === 1 ? "time" : "times"}
            </p>
          )}
        </div>
        <div
          className={`speech-arrow ${
            showInfo || props.repeatMode ? "" : "hide-arrow"
          }`}
        ></div>
      </div>
      <Lottie
        onClick={clickEvent}
        animationData={animationData}
        classID="animation_data"
        loop={true}
        className="animation__lottie"
        controls
        autoplay
      />
    </div>
  );
};

export default Animation;
