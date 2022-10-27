import React from "react";
import Reactm, { useContext } from "react";
import "./Quiz.css";
import Questions from "./Questions";
import Home from "./Home";
import { QuizContextProp } from "../Context/QuizContext";
const Quiz = () => {
  let QuizContextData = useContext(QuizContextProp);

  return (
    <div className="title-comtainer">
      {QuizContextData.fillOutName ? (
        <>
          <div className="title">你了解Jacky嗎!!</div>
          <div className="score">score:{QuizContextData.score}</div>
          <Questions />
        </>
      ) : (
        <Home />
      )}
    </div>
  );
};

export default Quiz;
