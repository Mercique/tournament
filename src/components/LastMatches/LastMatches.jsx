import { useEffect, useState } from "react";
import style from "./LastMatches.module.css";

export const LastMatches = ({ status }) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    switch (status) {
      case "win":
        setColor("#53b247");
        break;
      case "draw":
        setColor("#f9df59");
        break;
      case "loss":
        setColor("#f35c55");
        break;
      default:
        setColor("#242426");
        break;
    }
  }, [status]);

  return <div className={style.lastGame} style={{ backgroundColor: color }}></div>;
};
