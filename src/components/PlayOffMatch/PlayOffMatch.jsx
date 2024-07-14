import { useEffect, useState } from "react";
import style from "./PlayOffMatch.module.css";
import { useDispatch } from "react-redux";
import { updatePlayOff } from "../../store/tournament/actions";

export const PlayOffMatch = ({ match, matchId }) => {
  const dispatch = useDispatch();

  const [homeScore, setHomeScore] = useState(match.home.scored);
  const [visitScore, setVisitScore] = useState(match.visit.scored);

  const handleStage = (stage) => {
    switch (stage) {
      case "3nd place": {
        return 3;
      }
      case "Final": {
        return 1;
      }
      default: {
        return +match.stage.slice(2, 3);
      }
    }
  };

  useEffect(() => {
    if (homeScore !== "" && visitScore !== "") {
      const playOffMatch = {
        ...match,
        matchId,
        from: "playOff",
        stage: handleStage(match.stage),
      };

      playOffMatch.home.scored = homeScore;
      playOffMatch.visit.scored = visitScore;

      if (homeScore !== visitScore) {
        dispatch(updatePlayOff(playOffMatch));
      } else {
        console.log("Draw, change score!");
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeScore, match, visitScore]);

  return(
    <div className={style.playOffMatch}>
      <div className={style.playOffMatchTeam}>
        <div className={style.playOffMatchTeamName}>{match.home.name}</div>
        <input 
          type="number"
          value={homeScore}
          onChange={(e) => setHomeScore(+e.target.value)}
          disabled={!match.home.id | !match.visit.id}
        />
      </div>
      <div className={style.playOffMatchTeam}>
        <div className={style.playOffMatchTeamName}>{match.visit.name}</div>
        <input 
          type="number"
          value={visitScore}
          onChange={(e) => setVisitScore(+e.target.value)}
          disabled={!match.home.id | !match.visit.id}          
        />
      </div>
    </div>
  );
};
