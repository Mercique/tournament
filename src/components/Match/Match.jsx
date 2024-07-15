import { useEffect, useState } from "react";
import style from "./Match.module.css";
import { updateGroups, updateMatches } from "../../store/tournament/actions";
import { useDispatch } from "react-redux";
import { RandomButton } from "../RandomButton/RandomButton";

export const Match = ({ match, matchId }) => {
  const dispatch = useDispatch();
  const [homeScore, setHomeScore] = useState(1);
  const [visitScore, setVisitScore] = useState(2);
  const [openButton, setOpenButton] = useState(true);

  const handleSetStat = (status) => {
    const matchInfo = {
      ...match,
      matchId,
      teamSide: {
        home: {},
        visit: {},
      },
    };

    let count = 0;
    for (let side in match.teamSide) {
      matchInfo.teamSide[side] = {
        ...match.teamSide[side],
        stat: {
          games: 1,
          scored: count ? visitScore : homeScore,
          missed: count ? homeScore : visitScore,
        },
      };

      count++;
    }

    switch (status) {
      case "win": {
        matchInfo.teamSide.home.stat.wins = 1;
        matchInfo.teamSide.home.stat.points = 3;
        matchInfo.teamSide.home.status = "win";

        matchInfo.teamSide.visit.stat.loss = 1;
        matchInfo.teamSide.visit.status = "loss";
        break;
      }
      case "draw": {
        matchInfo.teamSide.home.stat.draws = 1;
        matchInfo.teamSide.home.stat.points = 1;
        matchInfo.teamSide.home.status = "draw";

        matchInfo.teamSide.visit.stat.draws = 1;
        matchInfo.teamSide.visit.stat.points = 1;
        matchInfo.teamSide.visit.status = "draw";
        break;
      }
      case "loss": {
        matchInfo.teamSide.visit.stat.wins = 1;
        matchInfo.teamSide.visit.stat.points = 3;
        matchInfo.teamSide.visit.status = "win";

        matchInfo.teamSide.home.stat.loss = 1;
        matchInfo.teamSide.home.stat.homeLoss = 1;
        matchInfo.teamSide.home.status = "loss";
        break;
      }
      default: {
        break;
      }
    }

    dispatch(updateGroups(matchInfo));
    dispatch(updateMatches(matchInfo));
  };

  useEffect(() => {
    if (homeScore !== "" && visitScore !== "") {
      setOpenButton(false);

      switch (match.stage) {
        case "groupStage": {
          if (homeScore > visitScore) {
            handleSetStat("win");
          } else if (homeScore === visitScore) {
            handleSetStat("draw");
          } else {
            handleSetStat("loss");
          }
          break;
        }
        case "playOff": {
          break;
        }
        default:{
          break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeScore, visitScore]);

  return (
    <div className={style.tour}>
      <div className={style.match}>
        <span className={style.teamHome}>{match.teamSide.home.name}</span>
        <div className={style.matchScore}>
          <input
            type="number"
            id={match.teamSide.home.id}
            value={homeScore}
            onChange={(e) => setHomeScore(+e.target.value)}
            disabled={!openButton}
          />
          <b>:</b>
          <input
            type="number"
            id={match.teamSide.visit.id}
            value={visitScore}
            onChange={(e) => setVisitScore(+e.target.value)}
            disabled={!openButton}
          />
        </div>
        <span className={style.teamVisit}>{match.teamSide.visit.name}</span>
        { openButton && <RandomButton setHomeScore={setHomeScore} setVisitScore={setVisitScore} /> }
      </div>
    </div>
  );
};
