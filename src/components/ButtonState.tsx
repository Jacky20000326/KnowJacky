import React from "react";
import "./ButtonState.css";
interface PropsType {
  correct: number;
}
const ButtonState = ({ correct }: PropsType) => {
  if (correct == -1) {
    return <button className="options-container-correct"></button>;
  } else {
    return <button className="options-container-fail">ButtonState</button>;
  }
};

export default ButtonState;
