import { Match } from "../Match/Match";
import style from "./Tour.module.css";

export const Tour = ({ tourId, tourMatches }) => {
  return (
    <div className={style.tour}>
      <h4 className={style.tourTitle}>Тур {tourId + 1}</h4>
      <div className={style.tourBox}>
        {tourMatches.map((match, idx) => (
          <Match match={match} matchId={idx} key={idx} />
        ))}
      </div>
    </div>
  );
};
