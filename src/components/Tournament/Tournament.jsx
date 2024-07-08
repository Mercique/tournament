import {
  addGroups,
  addMatches,
  addTeams,
} from "../../store/tournament/actions";
import {
  selectGroupNames,
  selectTournament,
} from "../../store/tournament/selectors";
import { getRandomInt, shuffle } from "../../utils/functions";
import style from "./Tournament.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../Table/Table";
import { Qualification } from "../Qualification/Qualification";

export const Tournament = () => {
  const dispatch = useDispatch();
  const tournament = useSelector(selectTournament);
  const groupNames = useSelector(selectGroupNames);

  const handleGetMatches = (group) => {
    const groupTeams = Object.keys(group);
    const numRounds = groupTeams.length - 1;

    for (let round = 0; round < numRounds; round++) {
      for (let i = 0; i < groupTeams.length / 2; i++) {
        let match = {};

        if (getRandomInt(2)) {
          match = [
            {...group[groupTeams[i]]},
            {...group[groupTeams[groupTeams.length - 1 - i]]},
          ];
        } else {
          match = [
            {...group[groupTeams[groupTeams.length - 1 - i]]},
            {...group[groupTeams[i]]},
          ];
        }

        dispatch(addMatches({ tour: `Tour-${round + 1}`, match: match }));
      }

      groupTeams.splice(1, 0, groupTeams.pop());
    }
  };

  const handleGetTournament = () => {
    let groupStage = {};
    let teams = [
      "Россия", "Аргентина", "Германия", "Испания",
      "Англия", "Италия", "Франция", "Португалия",
    ];
    let count = 1;

    shuffle(teams);
    dispatch(addTeams(teams));

    for (let group = 0; group < teams.length / 4; group++) {
      groupStage[groupNames[group]] = {};

      for (let team = group * 4; team < group * 4 + 4; team++) {
        groupStage[groupNames[group]][`team-${count}`] = {
          id: count,
          name: teams[team],
          games: 0,
          wins: 0,
          draws: 0,
          loss: 0,
          scored: 0,
          missed: 0,
          points: 0,
        };
        
        count++;
      }

      handleGetMatches(groupStage[groupNames[group]]);
    }

    dispatch(addGroups(groupStage));
  };

  return (
    <div className={style.tournament}>
      <button onClick={handleGetTournament}>data</button>
      <button onClick={() => console.log(tournament)}>tournament</button>
      {!Object.values(tournament.groups).length ||
        <div className={style.tournamentStage}>
          <Table />
          <Qualification />
        </div>
      }
    </div>
  );
};
