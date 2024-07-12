import { useState } from "react";
import style from "./PlayOffMatch.module.css";

export const PlayOffMatch = ({match}) => {
  const [homeScore, setHomeScore] = useState(match.home.scored);
  const [visitScore, setVisitScore] = useState(match.visit.scored);

  return(
    <div className={style.playOffMatch}>
      <div className={style.playOffMatchTeam}>
        <div className={style.playOffMatchTeamName}>{match.home.name}</div>
        <input 
          type="number"
          value={homeScore}
          onChange={(e) => setHomeScore(+e.target.value)}
        />
      </div>
      <div className={style.playOffMatchTeam}>
        <div className={style.playOffMatchTeamName}>{match.visit.name}</div>
        <input 
          type="number"
          value={visitScore}
          onChange={(e) => setVisitScore(+e.target.value)}          
        />
      </div>
    </div>
  );
};
