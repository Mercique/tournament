import style from "./Match.module.css";

export const Match = ({ tourMatches }) => {
  return (
    <div className={style.match}>
      {tourMatches.map((match, idx) => (
        <div key={idx}>
          <span>{match[0].name}</span>
          <input type="text" />
          :
          <input type="text" />
          <span>{match[1].name}</span>
        </div>
      ))}
    </div>
  );
};
