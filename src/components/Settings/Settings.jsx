import { useEffect, useState } from "react";
import style from "./Settings.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addSettings, addTeams } from "../../store/tournament/actions";
import { addRandomTeams, shuffle } from "../../utils/functions";
import { selectTeams } from "../../store/tournament/selectors";

export const Settings = () => {
  const dispatch = useDispatch();
  const teams = useSelector(selectTeams);

  // const [name, setName] = useState("");
  // const [desc, setDesc] = useState("");
  const [tournamentSystem, setTournamentSystem] = useState("");
  const [teamsCount, setTeamsCount] = useState(8);
  const [teamsInGroup, setTeamsInGroup] = useState(4);
  const [rangeCircle, setRangeCircle] = useState(1);

  const handleAddTeams = () => {
    const newTeams = addRandomTeams(teamsCount);
    dispatch(addTeams(newTeams));
  };

  const handleMixTeams = () => {
    const mixTeams = shuffle(teams);
    dispatch(addTeams(mixTeams));
  };

  const handleCreateTournament = (e) => {
    e.preventDefault();

    const settings = {
      teamsCount,
      teamsInGroup,
      rangeCircle,
      tournamentSystem,
    }

    dispatch(addSettings(settings));
  };

  useEffect(() => {
    if (tournamentSystem === "League") {
      setTeamsInGroup(teamsCount);
    }
  }, [tournamentSystem, teamsCount]);

  return (
    <div className={style.settings}>
      <h2 className={style.settingsTitle}>Создание турнира</h2>
      <div className={style.settingsWrapper}>
        <form onSubmit={(e) => handleCreateTournament(e)}>
          <div className={style.settingsBox}>
            <div className={style.settingsBoxLogo}>
              <h3>Логотип</h3>
              <div className={style.settingsLogo}>LOGO</div>
            </div>
            <div className={style.settingsName}>
              <label htmlFor="tournamentName">Название</label>
              <input type="text" id="tournamentName" />
            </div>
            <div className={style.settingsName}>
              <label htmlFor="tournamentDesc">Описание</label>
              <textarea id="tournamentDesc"></textarea>
            </div>
          </div>
          <div className={style.settingsBox}>
            <h3>Cистема проведения турнира</h3>
            <div>
              <div>
                <label htmlFor="tournamentLeague">Лига</label>
                <input 
                  type="radio"
                  id="League"
                  name="tournament"
                  checked={tournamentSystem === "League" ? true : false}
                  onChange={(e) => setTournamentSystem(e.target.id)}
                />
              </div>
              <div>
                <label htmlFor="tournamentGroupAndPlayOff">Групповой турнир + Плей-Офф</label>
                <input 
                  type="radio"
                  id="GroupAndPlayOff"
                  name="tournament"
                  checked={tournamentSystem === "GroupAndPlayOff" ? true : false}
                  onChange={(e) => setTournamentSystem(e.target.id)}
                />
              </div>
              <div>
                <label htmlFor="tournamentPlayOff">Плей-Офф</label>
                <input
                  type="radio"
                  id="PlayOff"
                  name="tournament"
                  checked={tournamentSystem === "PlayOff" ? true : false}
                  onChange={(e) => setTournamentSystem(e.target.id)}
                />
              </div>
            </div>
          </div>
          <div className={style.settingsBox}>
            <h3>Настройка турнира</h3>
            <div>
              <div>
                <label htmlFor="tournamentTeams">Кол-во команд</label>
                <input
                type="number"
                id="tournamentTeams"
                value={teamsCount}
                onChange={(e) => setTeamsCount(+e.target.value)}
                min={3}
                max={64}
                />
              </div>
              { tournamentSystem === "League" ||
                <div>
                  <label htmlFor="tournamentTeamsInGroup">Кол-во команд в группе</label>
                  <input
                  type="number"
                  id="tournamentTeamsInGroup"
                  value={teamsInGroup}
                  onChange={(e) => setTeamsInGroup(+e.target.value)}
                  min={3}
                  max={20}
                  />
                </div>
              }
              <div>
                <label htmlFor="tournamentCircle">Кол-во кругов</label>
                <input
                type="number"
                id="tournamentCircle"
                value={rangeCircle}
                onChange={(e) => setRangeCircle(+e.target.value)}
                min={1}
                max={2}
                />
              </div>
            </div>
            <div>
              <label htmlFor="tournament3ndPlace">Матч за 3-е место</label>
              <input type="checkbox" id="tournament3ndPlace" />
            </div>
          </div>
          <div className={style.settingsBox}>
            <h3>Список участников</h3>
          </div>
          <div>
            <div>
              <button type="button" onClick={handleAddTeams}>Добавить команды</button>
              <button type="button" onClick={handleMixTeams}>Перемешать команды</button>
            </div>
            <div>
            <button type="submit">Создать турнир</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
