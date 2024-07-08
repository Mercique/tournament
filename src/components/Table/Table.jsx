import { useSelector } from "react-redux";
import style from "./Table.mpdule.css";
import { selectGroups } from "../../store/tournament/selectors";
import { Group } from "../Group/Group";

export const Table = () => {
  const groups = useSelector(selectGroups);

  return (
    <div className={style.table}>
      <h3>Турнирная таблица</h3>
      {Object.keys(groups).map((name, idx) => (
        <div key={idx}>
          <h4>Группа {name}</h4>
          <div>
            <span>#</span>
            <span>Команда</span>
            <span>Игры</span>
            <span>В</span>
            <span>Н</span>
            <span>П</span>
            <span>Мячи</span>
            <span>Очки</span>
            <span>Посл.матчи</span>
          </div>
          <Group group={groups[name]} key={idx} />
        </div>
      ))}
    </div>
  );
};
