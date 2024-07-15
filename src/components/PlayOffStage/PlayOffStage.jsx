import { PlayOffMatch } from "../PlayOffMatch/PlayOffMatch";
import style from "./PlayOffStage.module.css";

export const PlayOffStage = ({ stageName, stage, stageId }) => {
  let gapStyle = ["20px", "124px", "333px", "748px"];

  return(
    <div className={style.stage}>
      <h4 className={style.stageName}>{stageName}</h4>
      <div className={style.stageBox} style={{ gap: gapStyle[stageId] }}>
        {Object.values(stage).map((match, idx) => (
          <PlayOffMatch match={match} matchId={idx} stageId={stageId} key={idx} />
        ))}
      </div>
    </div>
  );
};
