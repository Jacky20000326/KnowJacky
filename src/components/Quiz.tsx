import React from "react";
import Reactm, { useContext } from "react";

import Questions from "./Questions";
import Home from "./Home";
import { QuizContextProp } from "../Context/QuizContext";
const Quiz = () => {
  let QuizContextData = useContext(QuizContextProp);

  return (
    <div className="title-container">
      {QuizContextData.fillOutName ? <Questions /> : <Home />}
    </div>
  );
};

export default Quiz;
