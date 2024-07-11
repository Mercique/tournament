import { Match } from "../Match/Match";
import style from "./Tour.module.css";

export const Tour = ({ tourMatches }) => {
  return (
    <div className={style.tour}>
      {tourMatches.map((match, idx) => (
        <Match match={match} key={idx} />
      ))}
    </div>
  );
};
