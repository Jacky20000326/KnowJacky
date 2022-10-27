import React, { useState, useContext } from "react";
import "./Home.css";
import "bulma/css/bulma.min.css";
import { QuizContextProp } from "../Context/QuizContext";
import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
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
      return;
    }
    setInputRes((item) => (item = "寫一下名字拉！！"));
    console.log(inputRes);
  };

  return (
    <div className="Home-container">
      <div className="Home-title">先幫我留下大名吧，好認我之後感謝你</div>
      <TextField
        value={name}
        onChange={(e) => {
          setName((item) => (item = e.target.value));
        }}
        id="standard-basic"
        label="Standard"
        variant="standard"
      />
      <Button
        variant="contained"
        sx={{
          color: "#fff",
          backgroundColor: "#555555",
          borderColor: "#000",
          marginTop: "30px",
        }}
        onClick={() => {
          getUserName();
        }}
      >
        Contained
      </Button>
      <Grid className="alertStyle" container>
        <Grid item xs={12}>
          <Alert severity="error">想都別想，給我填！！</Alert>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
