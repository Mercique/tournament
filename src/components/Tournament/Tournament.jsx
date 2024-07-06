import { addGroups, addTeams } from "../../store/tournament/actions";
import { selectGroupNames, selectTournament } from "../../store/tournament/selectors";
import { shuffle } from "../../utils/functions";
import style from "./Tournament.module.css";
import { useDispatch, useSelector } from "react-redux";

export const Tournament = () => {
  const dispatch = useDispatch();
  const tournament = useSelector(selectTournament);
  const groupNames = useSelector(selectGroupNames);

  const handleGetTournament = () => {
    let groupStage = {};
    let teams = [
      "Россия",
      "Аргентина",
      "Германия",
      "Испания",
      "Англия",
      "Италия",
      "Франция",
      "Португалия",
    ];
    let count = 0;

    shuffle(teams);
    dispatch(addTeams(teams));

    for (let group = 0; group < teams.length / 4; group++) {
      groupStage[groupNames[group]] = {};

      for (let team = group * 4; team < group * 4 + 4; team++) {
        groupStage[groupNames[group]][teams[team]] = {
          id: ++count,
          games: 0,
          wins: 0,
          draws: 0,
          loss: 0,
          scored: 0,
          missed: 0,
          points: 0,
        }
      }
    }

    dispatch(addGroups(groupStage));
    //handleGetMatches(groupStage);
  };

  return (
    <div className={style.tournament}>
      <button onClick={handleGetTournament}>data</button>
      <button onClick={() => console.log(tournament)}>tournament</button>
      <div></div>
    </div>
  );
};
