import { useEffect, useState } from "react";
import style from "./Match.module.css";
import { updateGroups } from "../../store/tournament/actions";
import { useDispatch } from "react-redux";

export const Match = ({ match }) => {
  const [homeScore, setHomeScore] = useState("");
  const [visitScore, setVisitScore] = useState("");
  const dispatch = useDispatch();

  const handleSetStat = () => {
    const homeTeam = {...match[0], stat: {}};

    const visitTeam = {...match[1], stat: {}};

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
      homeTeam.stat.scored = homeScore;
      homeTeam.stat.missed = visitScore;
    }

    dispatch(updateGroups([homeTeam, visitTeam]));
  };

  useEffect(() => {
    if (homeScore !== "" && visitScore !== "") {
      handleSetStat();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeScore, visitScore]);

  return (
    <div className={style.tour}>
      <div className={style.match}>
        <span className={style.teamHome}>{match[0].name}</span>
        <div className={style.matchScore}>
          <input
            type="text"
            id={match[0].id}
            value={homeScore}
            onChange={(e) => setHomeScore(+e.target.value)}
          />
          <b>:</b>
          <input
            type="text"
            id={match[1].id}
            value={visitScore}
            onChange={(e) => setVisitScore(+e.target.value)}
          />
        </div>
        <span className={style.teamVisit}>{match[1].name}</span>
      </div>
    </div>
  );
};
