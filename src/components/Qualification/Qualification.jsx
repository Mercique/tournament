import { useSelector } from "react-redux";
import style from "./Qualification.module.css";
import { selectQualification } from "../../store/tournament/selectors";
import { Stage } from "../Stage/Stage";

export const Qualification = () => {
  const qualification = useSelector(selectQualification);

  return (
    <div className={style.qualification}>
      {Object.keys(qualification).map((stageName, idx) => (
        <div className={style.qualificationStage} key={idx}>
          {!Object.values(qualification[stageName].data).length || <Stage stage={qualification[stageName]} />}
        </div>
      ))}
    </div>
  );
};
