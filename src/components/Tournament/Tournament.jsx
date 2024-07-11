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
        const homeTeam = {...group[groupTeams[i]], scored: "", missed: ""};
        const visitTeam = {...group[groupTeams[groupTeams.length - 1 - i]], scored: "", missed: ""};

        delete homeTeam.stat;
        delete visitTeam.stat;

        homeTeam.lastMatches[`match-${round + 1}`] = 0;
        visitTeam.lastMatches[`match-${round + 1}`] = 0;

        if (getRandomInt(2)) {
          match = [homeTeam, visitTeam];
        } else {
          match = [visitTeam, homeTeam];
        }

        dispatch(addMatches({ tour: `Tour-${round + 1}`, match }));
      }

      groupTeams.splice(1, 0, groupTeams.pop());
    }
  };

  const handleGetTournament = () => {
    let groupStage = {};
    const teamsInGroup = 4;
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
    let id = 1;

    shuffle(teams);
    dispatch(addTeams(teams));

    for (let group = 0; group < teams.length / teamsInGroup; group++) {
      groupStage[groupNames[group]] = {};

      for (
        let team = group * teamsInGroup;
        team < group * teamsInGroup + teamsInGroup;
        team++
      ) {
        groupStage[groupNames[group]][`team-${id}`] = {
          id,
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
          },
          lastMatches: {},
        };

        id++;
      }

      handleGetMatches(groupStage[groupNames[group]]);
    }

    dispatch(addGroups(groupStage));
  };

  return (
    <div className={style.tournament}>
      <button
        type="button"
        style={{ color: "black" }}
        onClick={handleGetTournament}
      >
        data
      </button>
      <button
        type="button"
        style={{ color: "black" }}
        onClick={() => console.log(tournament)}
      >
        tournament
      </button>
      {!Object.values(tournament.groups).length || (
        <div className={style.tournamentStage}>
          <Table />
          <Qualification />
        </div>
      )}
    </div>
  );
};
