import React, { useState, useContext } from "react";
import "./Home.css";
// import "bulma/css/bulma.min.css";
import { QuizContextProp } from "../Context/QuizContext";

import ButtonStyle from "../MUI_hook/Button";

const Home = () => {
  // 取得填入姓名狀態
  const getNameState = useContext(QuizContextProp);
  const [name, setName] = useState("");
  // 是否填入狀態respond
  const [inputRes, setInputRes] = useState("");
  // 傳入輸入姓名
  const getUserName = () => {
    if (name) {
      getNameState.setFillOutName(true);
      getNameState.setName(name);
      return;
    }
    setInputRes((item) => (item = "寫一下名字拉！！"));
  };

  return (
    <div className="Home-container">
      <div className="logo-cube">
        <img src={require("../image/logo.jpg")} alt="" />
      </div>
      <div className="Home-title">先幫我留下大名吧，好認我之後感謝你</div>
      <input
        value={name}
        placeholder={inputRes}
        onChange={(e) => {
          setName((item) => (item = e.target.value));
        }}
      />
      <div>
        <ButtonStyle handler={getUserName}>開始!!!</ButtonStyle>
      </div>
    </div>
  );
};

export default Home;
