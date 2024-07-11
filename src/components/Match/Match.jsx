import { useEffect, useState } from "react";
import style from "./Match.module.css";
import { updateGroups, updateMatches } from "../../store/tournament/actions";
import { useDispatch } from "react-redux";
import { getRandomInt } from "../../utils/functions";

export const Match = ({ match }) => {
  const [homeScore, setHomeScore] = useState(match[0].scored);
  const [visitScore, setVisitScore] = useState(match[1].scored);
  const dispatch = useDispatch();

  const handleSetStat = () => {
    const homeTeam = {id: match[0].id, groupName: match[0].groupName, stat: {}, side: "home"};
    const visitTeam = {id: match[1].id, groupName: match[1].groupName, stat: {}, side: "visit"};

    if (homeScore > visitScore) {
      homeTeam.stat.games = 1;
      homeTeam.stat.wins = 1;
      homeTeam.stat.scored = homeScore;
      homeTeam.stat.missed = visitScore;
      homeTeam.stat.points = 3;

      visitTeam.stat.games = 1;
      visitTeam.stat.loss = 1;
      visitTeam.stat.scored = visitScore;
      visitTeam.stat.missed = homeScore;
    } else if (homeScore === visitScore) {
      homeTeam.stat.games = 1;
      homeTeam.stat.draws = 1;
      homeTeam.stat.scored = homeScore;
      homeTeam.stat.missed = visitScore;
      homeTeam.stat.points = 1;

      visitTeam.stat.games = 1;
      visitTeam.stat.draws = 1;
      visitTeam.stat.scored = visitScore;
      visitTeam.stat.missed = homeScore;
      visitTeam.stat.points = 1;
    } else {
      visitTeam.stat.games = 1;
      visitTeam.stat.wins = 1;
      visitTeam.stat.scored = visitScore;
      visitTeam.stat.missed = homeScore;
      visitTeam.stat.points = 3;

      homeTeam.stat.games = 1;
      homeTeam.stat.loss = 1;
      homeTeam.stat.homeLoss = 1;
      homeTeam.stat.scored = homeScore;
      homeTeam.stat.missed = visitScore;
    }

    dispatch(updateGroups([homeTeam, visitTeam]));
    dispatch(updateMatches([homeTeam, visitTeam]));
  };

  useEffect(() => {
    if (homeScore !== "" && visitScore !== "") {
      handleSetStat();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeScore, visitScore]);

  const handleScore = () => {
    setHomeScore(getRandomInt(4));
    setVisitScore(getRandomInt(4));
  };

  return (
    <div className={style.tour}>
      <div className={style.match}>
        <span className={style.teamHome}>{match[0].name}</span>
        <div className={style.matchScore}>
          <input
            type="number"
            id={match[0].id}
            value={homeScore}
            onChange={(e) => setHomeScore(+e.target.value)}
          />
          <b>:</b>
          <input
            type="number"
            id={match[1].id}
            value={visitScore}
            onChange={(e) => setVisitScore(+e.target.value)}
          />
        </div>
        <span className={style.teamVisit}>{match[1].name}</span>
        <button type="button" style={{ position: "absolute", right: "0", color: "#000" }} onClick={handleScore}>random</button>
      </div>
    </div>
  );
};
