import { useSelector } from "react-redux";
import style from "./Qualification.module.css";
import { selectMatches } from "../../store/tournament/selectors";
import { Match } from "../Match/Match";

export const Qualification = () => {
  const tours = useSelector(selectMatches);

  return (
    <div className={style.qualification}>
      {Object.keys(tours).map((tourName, idx) => (
        <div key={idx}>
          <h3>Тур {tourName.slice(-1)}</h3>
          <Match tourMatches={tours[tourName]} />
        </div>
      ))}
    </div>
  );
};
