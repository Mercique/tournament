import style from "./Group.module.css";
import { LastMatches } from "../LastMatches/LastMatches";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSettings } from "../../store/tournament/selectors";

export const Group = ({ group, groupId }) => {
  const settings = useSelector(selectSettings);

  useEffect(() => {
    const groupTeams = Object.values(group);
    const groupGames = groupTeams.reduce((acc, cur) => acc + cur.stat.games, 0);
    const length = settings.teamsInGroup - 1;

    if (groupGames === settings.teamsInGroup * settings.rangeCircle * length) {
      const bestTeams = [];

      for (let place = 0; place < 2; place++) {
        const team = {
          stage: `1/${settings.teamsCount / 4} stage`,
          id: groupTeams[place].id,
          name: groupTeams[place].name,
          groupId,
        }

        bestTeams.push(team);
      }

      console.log(bestTeams);
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
            {Object.values(group[team].lastMatches).map((status, idx) => (
              <LastMatches status={status} key={idx} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
