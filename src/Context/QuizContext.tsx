import React, { createContext, useState } from "react";

interface QuizType {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  fillOutName: boolean;
  setFillOutName: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}
interface Props {
  children: React.ReactNode;
}

export const QuizContextProp = createContext<QuizType>({} as QuizType);

const QuizContext = (props: Props) => {
  let [score, setScore] = useState(0);
  let [count, setCount] = useState(1);
  let [name, setName] = useState("");
  // 是否填入姓名狀態管理
  let [fillOutName, setFillOutName] = useState(false);
  return (
    <QuizContextProp.Provider
      value={{
        score,
        setScore,
        count,
        setCount,
        fillOutName,
        setFillOutName,
        name,
        setName,
      }}
    >
      {props.children}
    </QuizContextProp.Provider>
  );
};

export default QuizContext;
