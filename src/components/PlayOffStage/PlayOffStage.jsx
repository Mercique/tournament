import { PlayOffMatch } from "../PlayOffMatch/PlayOffMatch";
import style from "./PlayOffStage.module.css";

export const PlayOffStage = ({ stageName, stage, stageId }) => {
  let gapStyle = ["20px", "123px", "333px"];

  return(
    <div className={style.stage}>
      <h4 className={style.stageName}>{stageName}</h4>
      <div className={style.stageBox} style={{ gap: gapStyle[stageId] }}>
        {Object.values(stage).map((match, idx) => (
          <PlayOffMatch match={match} key={idx} />
        ))}
      </div>
    </div>
  );
};
