import { useState, useEffect } from "react";

// 傳入倒數時間、計時器開關、設定計時器的方法
const useCountdown = (
  timer: number,
  isTimeUP: boolean,
  setTimeHandler: any
) => {
  let [time, setTime] = useState<number>(0);
  let [timeUP, setTimeUp] = useState<boolean>(true);
  useEffect(() => {
    if (!isTimeUP) {
      setTime(timer);
      setTimeHandler(isTimeUP);
    }
    console.log(isTimeUP);
  }, [isTimeUP]);

  useEffect(() => {
    let tineOutId = setTimeout(() => {
      if (time == 0) {
        setTimeHandler(true);
        return;
      }
      setTime((item) => item - 1);
    }, 1000);

    return () => {
      clearTimeout(tineOutId);
    };
  }, [time]);
  // 回傳時間及是否結束(boolean)
  return { time, isTimeUP };
};

export default useCountdown;
