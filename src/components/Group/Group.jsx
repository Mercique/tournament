import style from "./Group.module.css";

export const Group = ({ group }) => {
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
          <span className={style.groupTeamLastGames}>o o o</span>
        </div>
      ))}
    </div>
  );
};
