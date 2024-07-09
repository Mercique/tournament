import { useEffect, useState } from "react";
import style from "./LastMatches.module.css";

export const LastMatches = ({ value }) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    switch (value) {
      case 1:
        setColor("#53b247");
        break;
      case 2:
        setColor("#f9df59");
        break;
      case 3:
        setColor("#f35c55");
        break;
      default:
        setColor("#242426");
        break;
    }
  }, [value]);

  return <div className={style.lastGame} style={{ backgroundColor: color }}></div>;
};
