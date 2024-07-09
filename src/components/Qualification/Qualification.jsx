import { useSelector } from "react-redux";
import style from "./Qualification.module.css";
import { selectMatches } from "../../store/tournament/selectors";
import { Match } from "../Match/Match";

export const Qualification = () => {
  const tours = useSelector(selectMatches);

  return (
    <div className={style.qualification}>
      <h2>Квалификация</h2>
      {Object.keys(tours).map((tourName, idx) => (
        <div key={idx}>
          <h4 className={style.tourName}>Тур {idx + 1}</h4>
          {tours[tourName].map((match, key) => (
            <Match match={match} tour={idx + 1} key={key} />
          ))}
        </div>
      ))}
    </div>
  );
};
