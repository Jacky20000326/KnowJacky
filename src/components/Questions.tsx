import React, { useContext, useState, useEffect } from "react";
import "./Questions.css";
import TextField from "@mui/material/TextField";
import data from "../topic.json";
import { QuizContextProp } from "../Context/QuizContext";
import ButtonStyle from "../MUI_hook/Button";
import useCountdown from "../hook/useCountdown";
import useScoreRespond from "../hook/useScoreRespond";

import axios from "axios";

const Questions = () => {
  // state
  //使用者msg
  const [message, setMessage] = useState("");
  // 顯示按鈕樣式狀態
  const [btnState, setBtnState] = useState<number>(0);
  // 使用者選擇的答案
  const [choose, setChoose] = useState<number>(0);
  // 顯示按鈕(下一步)
  const [showBtn, setShowBtn] = useState<boolean>(false);
  // 顯示最後總分及回應
  const [complete, setComplete] = useState<boolean>(false);
  // 控制計時器
  const [timeUPHandler, setTimeUPHandler] = useState<boolean>(false);
  //倒數計時設定開始結束
  let QuizContextData = useContext(QuizContextProp);
  // 取得useCountdown值
  let { time, isTimeUP } = useCountdown(3, timeUPHandler, setTimeUPHandler);
  // 取得分數對應的回應
  let { respond } = useScoreRespond(QuizContextData.score);
  // 存數使用者資料
  const storeUserData = () => {
    axios
      .post("http://localhost:3002/user", {
        name: QuizContextData.name,
        score: QuizContextData.score,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const storeUserMsg = () => {
    axios
      .post("http://localhost:3002/user/msg", {
        msg: message,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sentAns = (choose: number, ans: number) => {
    setShowBtn(true);
    setChoose(choose);
    setBtnState(-1);
    // 關閉計時功能
    setTimeUPHandler(true);
    if (choose === ans) {
      QuizContextData.setScore((item) => item + 10);
      setBtnState(1);
    }
  };

  const NextQuestion = () => {
    QuizContextData.setCount((item) => item + 1);
    setBtnState(0);
    setShowBtn(false);
    // 啟動計時功能
    setTimeUPHandler(false);
  };
  const completeAllQuestion = () => {
    setComplete(true);
    storeUserData();
  };

  useEffect(() => {
    // 故意給錯的
    if (btnState == 1 || btnState == -1) {
      return;
    }
    if (isTimeUP == true) sentAns(0, 5);
  }, [timeUPHandler]);
  return (
    <div className="question-container">
      {complete ? (
        message == " " ? (
          <div className="bye">Bye~~</div>
        ) : (
          <div className="Complete">
            <div className="scale">你的總分：{QuizContextData.score}/100</div>
            <div className="completeRes">{respond}</div>
            <input
              type="text"
              value={message}
              onChange={(e) => {
                setMessage((item) => (item = e.target.value));
              }}
            />

            <ButtonStyle handler={storeUserMsg}>送出</ButtonStyle>
          </div>
        )
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
              btnState == 0 ? (
                <button
                  onClick={() => {
                    sentAns(item.id, data[QuizContextData.count - 1].answer);
                  }}
                  className="options-container"
                >
                  {item.q}
                </button>
              ) : btnState == 1 ? (
                <button
                  className="options-container"
                  style={
                    item.id == data[QuizContextData.count - 1].answer
                      ? { backgroundColor: "#496e59", color: "#fff" }
                      : { backgroundColor: "#fff" }
                  }
                >
                  {item.q}
                </button>
              ) : (
                <button
                  className="options-container"
                  style={
                    data[QuizContextData.count - 1].answer == item.id
                      ? { backgroundColor: "#496e59", color: "#fff" }
                      : choose !== data[QuizContextData.count - 1].answer
                      ? { backgroundColor: "red", color: "#fff" }
                      : { backgroundColor: "#fff" }
                  }
                >
                  {item.q}
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
