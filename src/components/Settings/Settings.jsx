import { useEffect, useState } from "react";
import style from "./Settings.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addGroups, addMatches, addPlayOff, addSettings, addTeams, clearTeams, mixTeams } from "../../store/tournament/actions";
import { addRandomTeams, getRandomInt, shuffle } from "../../utils/functions";
import { selectGroupNames, selectTeams, selectTournament } from "../../store/tournament/selectors";

export const Settings = () => {
  const dispatch = useDispatch();
  const teams = useSelector(selectTeams);
  const groupNames = useSelector(selectGroupNames);
  const tournament = useSelector(selectTournament);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tournamentSystem, setTournamentSystem] = useState("League");
  const [teamsCount, setTeamsCount] = useState(8);
  const [teamsInGroup, setTeamsInGroup] = useState(4);
  const [rangeCircle, setRangeCircle] = useState(1);
  const [threePlace, setThreePlace] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [namedNewTeam, setNamedNewTeam] = useState(0);

  const handleGetMatches = (group, stage, range) => {
    const groupTeams = Object.keys(group);
    const numRounds = groupTeams.length % 2 === 0 ? groupTeams.length - 1 : groupTeams.length;
    const oddNum = teamsInGroup % 2 === 0 ? 1 : 0;

    for (let countRange = 0; countRange < range; countRange++) {
      for (let round = numRounds * countRange; round < numRounds * countRange + numRounds; round++) {
        for (let i = 0; i < groupTeams.length / 2; i++) {
          if (group[groupTeams[i]].id === group[groupTeams[groupTeams.length - 1 - i]].id) {
            break;
          }

          const matchTour = {
            teamSide: {
              home: {},
              visit: {},
            },
            tourName: `Tour-${round + 1}`,
            groupName: group[groupTeams[i]].groupName,
            stage,
          };

          let count = getRandomInt(2);
          for (let side in matchTour.teamSide) {
            matchTour.teamSide[side] = {
              id: count ? group[groupTeams[i]].id : group[groupTeams[groupTeams.length - 1 - i]].id,
              name: count ? group[groupTeams[i]].name : group[groupTeams[groupTeams.length - 1 - i]].name,
              stat: {
                scored: "",
                missed: "",
              },
            };

            count = count ? 0 : 1;
          }

          dispatch(addMatches(matchTour));
        }

        groupTeams.splice(oddNum, 0, groupTeams.pop());
      }
    }
  };

  const handleGetGroups = (groupsCount) => {
    let groupStage = {};

    for (let group = 0; group < groupsCount; group++) {
      groupStage[groupNames[group]] = {};

      for (let team = group * teamsInGroup; team < group * teamsInGroup + teamsInGroup; team++) {
        groupStage[groupNames[group]][`team-${team + 1}`] = {
          id: team + 1,
          name: teams[team],
          groupName: groupNames[group],
          stat: {
            games: 0,
            wins: 0,
            draws: 0,
            loss: 0,
            scored: 0,
            missed: 0,
            points: 0,
            homeLoss: 0,
            homeDraw: 0,
          },
          lastMatches: [],
        };

        for (let last = 0; last < ((teamsInGroup - 1) * rangeCircle < 5 ? (teamsInGroup - 1) * rangeCircle : 5); last++) {
          groupStage[groupNames[group]][`team-${team + 1}`].lastMatches[last] = "empty";
        }
      }

      handleGetMatches(groupStage[groupNames[group]], "groupStage", rangeCircle);
    }

    dispatch(addGroups(groupStage));

    if (groupsCount > 1) {
      dispatch(addPlayOff(teams.length / teamsInGroup));
    }
  };

  const handleAddTeam = () => {
    setNamedNewTeam((prevNamedNewTeam) => prevNamedNewTeam + 1);
    dispatch(addTeams([teamName]));
    setTeamName("");
  };

  const handleAddRandomTeams = () => {
    const countRandomTeams = teamsCount - namedNewTeam;
    const randomTeams = addRandomTeams(countRandomTeams);
    dispatch(addTeams(randomTeams));
  };

  const handleAddClearTeams = () => {
    dispatch(clearTeams());
  };

  const handleMixTeams = () => {
    const mix = shuffle(teams);
    dispatch(mixTeams(mix));
  };

  const handleCreateTournament = (e) => {
    e.preventDefault();

    const settings = {
      idTournament: Date.now(),
      title,
      desc,
      teamsCount,
      groupsCount: teamsCount / teamsInGroup,
      teamsInGroup,
      rangeCircle,
      tournamentSystem,
      threePlace,
    }

    dispatch(addSettings(settings));
    handleGetGroups(settings.groupsCount);
  };

  useEffect(() => {
    if (tournamentSystem !== "GroupAndPlayOff") {
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
              <input 
                type="text" 
                id="tournamentName" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={style.settingsName}>
              <label htmlFor="tournamentDesc">Описание</label>
              <textarea 
                id="tournamentDesc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
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
              { tournamentSystem === "GroupAndPlayOff" &&
                <div>
                  <label htmlFor="tournamentTeamsInGroup">Кол-во команд в группе</label>
                  <input
                  type="number"
                  id="tournamentTeamsInGroup"
                  value={teamsInGroup}
                  onChange={(e) => setTeamsInGroup(+e.target.value)}
                  min={1}
                  max={7}
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
            {tournamentSystem === "League" ||
              <div>
                <label htmlFor="tournament3ndPlace">Матч за 3-е место</label>
                <input
                  type="checkbox"
                  id="tournament3ndPlace"
                  checked={threePlace}
                  onChange={() => setThreePlace(!threePlace)}
                />
              </div>
            }
          </div>
          <div className={style.settingsBox}>
            <h3>Список участников</h3>
            <div>
              <span>#</span>
              <span>Команда</span>
            </div>
            <div>
              {teams.map((name, idx) => (
                <div key={idx}>
                  <span>{idx + 1}</span>
                  <span>{name}</span>
                </div>
              ))}
            </div>
            {teamsCount === teams.length || <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />}
          </div>
          <div>
            <div>
              <button type="button" onClick={handleAddTeam} disabled={teams.length === teamsCount | !teamName}>Добавить</button>
              <button type="button" onClick={handleAddRandomTeams} disabled={teams.length === teamsCount}>Заполнить</button>
              <button type="button" onClick={handleAddClearTeams} disabled={!teams.length}>Очистить</button>
              <button type="button" onClick={handleMixTeams} disabled={!teams.length}>Перемешать</button>
            </div>
            <div>
            <button type="submit">Создать турнир</button>
            <button type="button" onClick={() => console.log(tournament)}>log</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
