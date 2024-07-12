import { Tour } from "../Tour/Tour";
import style from "./Stage.module.css";

export const Stage = ({ stage }) => {
  return (
    <div className={style.stage}>
      <h2 className={style.stageTitle}>{stage.name}</h2>
      {Object.keys(stage.matches).map((tourName, idx) => (
        <div key={idx}>
          <h2>Тур {idx + 1}</h2>
          <Tour tourMatches={stage.matches[tourName]} />
        </div>
      ))}
    </div>
  );
};
