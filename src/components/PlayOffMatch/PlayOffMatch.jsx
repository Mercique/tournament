import { useEffect, useState } from "react";
import style from "./PlayOffMatch.module.css";
import { useDispatch } from "react-redux";
import { updatePlayOff } from "../../store/tournament/actions";
import { RandomButton } from "../RandomButton/RandomButton";

export const PlayOffMatch = ({ match, matchId, stageId }) => {
  const dispatch = useDispatch();

  const [homeScore, setHomeScore] = useState(match.home.scored);
  const [visitScore, setVisitScore] = useState(match.visit.scored);
  const [openButton, setOpenButton] = useState(true);

  const styles = [
    "playOffMatch-1", "playOffMatch-2",
    "playOffMatch-3", "playOffMatch-4",
  ];

  const handleStage = (stage) => {
    switch (stage) {
      case "3nd place": {
        return 3;
      }
      case "Final": {
        return 1;
      }
      default: {
        return typeof +match.stage.slice(2, 4) === Number ? +match.stage.slice(2, 3) : +match.stage.slice(2, 4);
      }
    }
  };

  useEffect(() => {
    if (homeScore !== "" && visitScore !== "") {
      setOpenButton(false);

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
        setHomeScore("");
        setVisitScore("");
        setOpenButton(true);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeScore, match, visitScore]);

  return(
    <div className={match.stage.slice(2, 3) !== "n" && match.stage.slice(2, 3) !== "d"? `${style.playOffMatch} ${style[styles[stageId]]}` : match.stage.slice(2, 3) === "d" ? `${style.playOffThree}` : `${style.playOffFinal}`}>
      <div className={style.playOffMatchTeam}>
        <div className={style.playOffMatchTeamName}>{match.home.name}</div>
        <input 
          type="number"
          value={homeScore}
          onChange={(e) => setHomeScore(+e.target.value)}
          disabled={!match.home.id | !match.visit.id | !openButton}
        />
      </div>
      <div className={style.playOffMatchTeam}>
        <div className={style.playOffMatchTeamName}>{match.visit.name}</div>
        <input 
          type="number"
          value={visitScore}
          onChange={(e) => setVisitScore(+e.target.value)}
          disabled={!match.home.id | !match.visit.id | !openButton}          
        />
      </div>
      { match.home.id && match.visit.id && openButton && <RandomButton setHomeScore={setHomeScore} setVisitScore={setVisitScore} /> }
    </div>
  );
};
