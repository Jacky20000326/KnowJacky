import React, { useState, useEffect } from "react";

const useScoreRespond = (score: number) => {
  let [respond, setRespond] = useState("");
  useEffect(() => {
    if (score < 50) {
      setRespond(
        "哎呀看來你現在不怎麼認識我了，這幾年我變化很多有機會我們一起聊聊吧！！"
      );
    } else if (score >= 60 && score <= 80) {
      setRespond(
        "看來我們是朋友，我們應該一段時間沒見了，有機會我們一起聊聊吧！！"
      );
    } else {
      setRespond(
        "水喔，我們感情真的很好，我也把你當做我的摯友，找時間我們在聚一下"
      );
    }
  }, [score]);

  return { respond };
};

export default useScoreRespond;
