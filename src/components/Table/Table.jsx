import { useSelector } from "react-redux";
import style from "./Table.module.css";
import { selectGroups } from "../../store/tournament/selectors";
import { Group } from "../Group/Group";

export const Table = () => {
  const groups = useSelector(selectGroups);

  return (
    <div className={style.table}>
      <h2 className={style.tableTitle}>Турнирная таблица</h2>
      {Object.keys(groups).map((name, idx) => (
        <div key={idx}>
          <h4 className={style.groupTitle}>Группа {name}</h4>
          <Group group={groups[name]} groupId={idx} key={idx} />
        </div>
      ))}
    </div>
  );
};
