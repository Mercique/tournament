import { useSelector } from "react-redux";
import style from "./Qualification.module.css";
import { selectMatches } from "../../store/tournament/selectors";
import { Match } from "../Match/Match";

export const Qualification = () => {
  const tours = useSelector(selectMatches);

  return (
    <div className={style.qualification}>
      <h3>Квалификация</h3>
      {Object.keys(tours).map((tourName, idx) => (
        <div key={idx}>
          <h4 className={style.tourName}>Тур {tourName.slice(-1)}</h4>
          {tours[tourName].map((match, idx) => (
            <Match match={match} key={idx} />
          ))}
        </div>
      ))}
    </div>
  );
};
