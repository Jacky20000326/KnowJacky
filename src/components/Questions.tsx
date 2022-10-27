import React, { useContext, useState } from "react";
import "./Questions.css";
import data from "../topic.json";
import { QuizContextProp } from "../Context/QuizContext";

const Questions = () => {
  // state
  const [validate, setValidate] = useState<boolean>(true);
  const [choose, setChoose] = useState<number>(0);
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  let QuizContextData = useContext(QuizContextProp);

  const sentAns = (choose: number, ans: number) => {
    if (choose === ans) {
      QuizContextData.setScore((item) => item + 25);
    }
    setShowBtn(true);
    setChoose(choose);
    setValidate(false);
  };

  const NextQuestion = () => {
    QuizContextData.setCount((item) => item + 1);
    setValidate(true);
    setShowBtn(false);
  };
  const completeAllQuestion = () => {
    setComplete(true);
  };

  return (
    <div className="question-container">
      {complete ? (
        <>你的總分：{QuizContextData.score}</>
      ) : (
        <>
          <div className="questuon-count">
            {QuizContextData.count}/{data.length}
          </div>
          <div className="questions">
            <div className="questions-text">
              {data[QuizContextData.count - 1].question}
            </div>
            {data[QuizContextData.count - 1].options.map((item, i) =>
              validate ? (
                <button
                  onClick={() => {
                    sentAns(item.id, data[QuizContextData.count - 1].answer);
                  }}
                  className="options-container"
                >
                  {i}.{item.q}
                </button>
              ) : (
                <button
                  style={
                    data[QuizContextData.count - 1].answer == item.id
                      ? { backgroundColor: "green" }
                      : choose !== data[QuizContextData.count - 1].answer
                      ? { backgroundColor: "red" }
                      : { backgroundColor: "#fff" }
                  }
                  disabled
                  onClick={() => {
                    sentAns(item.id, data[QuizContextData.count].answer);
                  }}
                  className="options-container"
                >
                  {i}.{item.q}
                </button>
              )
            )}
          </div>
          {showBtn ? (
            QuizContextData.count == data.length ? (
              <button
                onClick={() => {
                  completeAllQuestion();
                }}
                className="btn"
              >
                完成
              </button>
            ) : (
              <button
                onClick={() => {
                  NextQuestion();
                }}
                className="btn"
              >
                Next
              </button>
            )
          ) : null}
        </>
      )}
    </div>
  );
};

export default Questions;
