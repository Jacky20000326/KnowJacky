import React, { useContext, useState, useEffect } from "react";
import "./Questions.css";
import data from "../topic.json";
import { QuizContextProp } from "../Context/QuizContext";
import ButtonStyle from "../MUI_hook/Button";
import useCountdown from "../hook/useCountdown";
import useScoreRespond from "../hook/useScoreRespond";
const Questions = () => {
  // state
  const [validate, setValidate] = useState<boolean>(true);
  const [choose, setChoose] = useState<number>(0);
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  // 控制計時器
  const [timeUPHandler, setTimeUPHandler] = useState<boolean>(false);
  //倒數計時設定開始結束
  let QuizContextData = useContext(QuizContextProp);
  // 取得useCountdown值
  let { time, isTimeUP } = useCountdown(3, timeUPHandler, setTimeUPHandler);
  // 取得分數對應的回應
  let { respond } = useScoreRespond(QuizContextData.score);
  const sentAns = (choose: number, ans: number) => {
    if (choose === ans) {
      QuizContextData.setScore((item) => item + 25);
    }
    setShowBtn(true);
    setChoose(choose);
    setValidate(false);
    // 關閉計時功能
    setTimeUPHandler(true);
  };

  const NextQuestion = () => {
    QuizContextData.setCount((item) => item + 1);
    setValidate(true);
    setShowBtn(false);
    // 啟動計時功能
    setTimeUPHandler(false);
  };
  const completeAllQuestion = () => {
    setComplete(true);
  };

  useEffect(() => {
    // 故意給錯的
    if (isTimeUP == true) sentAns(0, 5);
  }, [timeUPHandler]);
  return (
    <div className="question-container">
      {complete ? (
        <div className="Complete">
          <div className="scale">你的總分：{QuizContextData.score}/100</div>
          <div className="completeRes">{respond}</div>
        </div>
      ) : (
        <>
          <div className="question-count">
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
                  {i + 1}.{item.q}
                </button>
              ) : (
                <button
                  style={
                    data[QuizContextData.count - 1].answer == item.id
                      ? { backgroundColor: "#496e59", color: "#fff" }
                      : choose !== data[QuizContextData.count - 1].answer
                      ? { backgroundColor: "red", color: "#fff" }
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
              <ButtonStyle handler={completeAllQuestion}>完成</ButtonStyle>
            ) : (
              <ButtonStyle handler={NextQuestion}>下一題</ButtonStyle>
            )
          ) : null}
        </>
      )}
      {complete ? null : (
        <div className="time-cube">
          <div className="time-txt">倒數計時</div>
          <div className="time">{time}</div>
        </div>
      )}
    </div>
  );
};

export default Questions;
