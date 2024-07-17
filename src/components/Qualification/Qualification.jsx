import { useSelector } from "react-redux";
import style from "./Qualification.module.css";
import { selectGroupStage } from "../../store/tournament/selectors";
import { Tour } from "../Tour/Tour";

export const Qualification = () => {
  const groupStage = useSelector(selectGroupStage);

  return (
    <div className={style.qualification}>
      <h2 className={style.qualificationTitle}>{groupStage.name}</h2>
      {Object.keys(groupStage.matches).map((tourName, idx) => (
        <div className={style.qualificationStage} key={idx}>
          <Tour tourId={idx} tourMatches={groupStage.matches[tourName]} />
        </div>
      ))}
    </div>
  );
};
