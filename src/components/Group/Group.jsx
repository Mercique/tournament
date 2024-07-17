import style from "./Group.module.css";
import { LastMatches } from "../LastMatches/LastMatches";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSettings } from "../../store/tournament/selectors";
import { updatePlayOff } from "../../store/tournament/actions";

export const Group = ({ group, groupId }) => {
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);

  useEffect(() => {
    const groupTeams = Object.values(group);
    const groupGames = groupTeams.reduce((acc, cur) => acc + cur.stat.games, 0);
    const length = settings.teamsInGroup - 1;

    if (groupGames === settings.teamsInGroup * settings.rangeCircle * length) {
      const bestTeams = {
        groupId,
        stage: settings.teamsCount / settings.teamsInGroup,
        from: "groupStage",
        teams: {
          firstPlace: {},
          secondPlace: {},
        },
      };

      let placeCount = 0;
      
      for (let place in bestTeams.teams) {
        bestTeams.teams[place] = {
          id: groupTeams[placeCount].id,
          name: groupTeams[placeCount].name,
          scored: "",
        }

        placeCount++;
      }

      if (settings.teamsInGroup !== settings.teamsCount) {
        dispatch(updatePlayOff(bestTeams));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group, settings.rangeCircle, settings.teamsInGroup]);

  return (
    <div className={style.group}>
      <div className={style.groupRow}>
        <span className={style.groupTeamCount}>#</span>
        <span className={style.groupTeamName}>Команда</span>
        <span className={style.groupTeamStat}>Игры</span>
        <span className={style.groupTeamStat}>В</span>
        <span className={style.groupTeamStat}>Н</span>
        <span className={style.groupTeamStat}>П</span>
        <span className={style.groupTeamPoints}>Мячи</span>
        <span className={style.groupTeamPoints}>Очки</span>
        <span className={style.groupTeamLastGames}>Посл.матчи</span>
      </div>
      {Object.keys(group).map((team, idx) => (
        <div className={style.groupRow} key={idx}>
          <span className={style.groupTeamCount}>{idx + 1}</span>
          <span className={style.groupTeamName}>{group[team].name}</span>
          <span className={style.groupTeamStat}>{group[team].stat.games}</span>
          <span className={style.groupTeamStat}>{group[team].stat.wins}</span>
          <span className={style.groupTeamStat}>{group[team].stat.draws}</span>
          <span className={style.groupTeamStat}>{group[team].stat.loss}</span>
          <div className={style.groupTeamPoints}>
            <span>{group[team].stat.scored}</span>
            <span className={style.dash}>-</span>
            <span>{group[team].stat.missed}</span>
          </div>
          <span className={style.groupTeamPoints}>{group[team].stat.points}</span>
          <div className={style.groupTeamLastGames}>
            {group[team].lastMatches.map((status, idx) => (
              <LastMatches status={status} key={idx} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
