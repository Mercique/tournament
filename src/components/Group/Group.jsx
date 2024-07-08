import style from "./Group.module.css";

export const Group = ({ group }) => {
  return (
    <div className={style.group}>
      {Object.keys(group).map((team, idx) => (
        <div key={idx}>
          <span>{idx + 1}</span>
          <span>{group[team].name}</span>
          <span>{group[team].games}</span>
          <span>{group[team].wins}</span>
          <span>{group[team].draws}</span>
          <span>{group[team].loss}</span>
          <span>
            {group[team].scored}-{group[team].missed}
          </span>
          <span>{group[team].points}</span>
          <span>o o o</span>
        </div>
      ))}
    </div>
  );
};
