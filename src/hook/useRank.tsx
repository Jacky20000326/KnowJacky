import React, { useEffect, useState } from "react";
import axios from "axios";
const useRank = () => {
  let apiUrl = "http://localhost:3002/post";
  let [rank, setRank] = useState(null);
  const getGameRank = () => {
    axios
      .post(apiUrl, { name: "Jacky", score: 20, msg: "hi" })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      });
  };
  return <div>useRank</div>;
};

export default useRank;
