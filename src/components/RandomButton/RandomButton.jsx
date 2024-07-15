import { getRandomInt } from "../../utils/functions";
import style from "./RandomButton.module.css";

export const RandomButton = ({ setHomeScore, setVisitScore }) => {
  const handleScore = () => {
    setHomeScore(getRandomInt(5));
    setVisitScore(getRandomInt(5));
  };

  return (
    <button type="button" className={style.randomButton} onClick={handleScore}>
      R
    </button>
  );
};
