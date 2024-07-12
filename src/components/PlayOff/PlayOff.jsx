import { useSelector } from "react-redux";
import style from "./PlayOff.module.css";
import { selectPlayOff } from "../../store/tournament/selectors";
import { PlayOffStage } from "../PlayOffStage/PlayOffStage";

export const PlayOff = () => {
  const playOff = useSelector(selectPlayOff);

  return (
    <div className={style.playOff}>
      <h2 className={style.playOffTitle}>{playOff.name}</h2>
      {!Object.keys(playOff.matches).length || (
        <div className={style.playOffGrid}>
          {Object.keys(playOff.matches).map((stage, idx) => (
            <PlayOffStage stageName={stage} stage={playOff.matches[stage]} stageId={idx} key={idx}/>
          ))}
        </div>
      )}
    </div>
  );
};
