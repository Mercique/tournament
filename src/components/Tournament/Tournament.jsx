import { addGroups, addMatches, addSettings, addTeams } from "../../store/tournament/actions";
import { selectGroupNames, selectTournament } from "../../store/tournament/selectors";
import { getRandomInt, shuffle } from "../../utils/functions";
import style from "./Tournament.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../Table/Table";
import { Qualification } from "../Qualification/Qualification";

export const Tournament = () => {
  const dispatch = useDispatch();
  const tournament = useSelector(selectTournament);
  const groupNames = useSelector(selectGroupNames);

  const handleGetMatches = (group, stage, range) => {
    const groupTeams = Object.keys(group);
    const numRounds = groupTeams.length - 1;

    for (let round = 0; round < numRounds * range; round++) {
      for (let i = 0; i < groupTeams.length / 2; i++) {
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

      groupTeams.splice(1, 0, groupTeams.pop());
    }
  };

  const handleGetTournament = () => {
    const settings = {
      teamsInGroup: 4,
      rangeCircle: 1,
    };

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
      "Бельгия",
      "Нидерланды",
      "Уругвай",
      "Бразилия",
    ];

    shuffle(teams);
    dispatch(addTeams(teams));
    dispatch(addSettings(settings));

    for (let group = 0; group < teams.length / settings.teamsInGroup; group++) {
      groupStage[groupNames[group]] = {};

      for (let team = group * settings.teamsInGroup; team < group * settings.teamsInGroup + settings.teamsInGroup; team++) {
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
          },
          lastMatches: {},
        };

        for (let last = 0; last < (settings.teamsInGroup - 1) * settings.rangeCircle; last++) {
          groupStage[groupNames[group]][`team-${team + 1}`].lastMatches[[`match-${last + 1}`]] = "";
        }
      }

      handleGetMatches(groupStage[groupNames[group]], "groupStage", settings.rangeCircle);
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
