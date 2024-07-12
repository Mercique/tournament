import { addGroups, addMatches, addPlayOff, addSettings, addTeams } from "../../store/tournament/actions";
import { selectGroupNames, selectTournament } from "../../store/tournament/selectors";
import { getRandomInt, shuffle } from "../../utils/functions";
import style from "./Tournament.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../Table/Table";
import { Qualification } from "../Qualification/Qualification";
import { PlayOff } from "../PlayOff/PlayOff";
import { useState } from "react";

export const Tournament = () => {
  const dispatch = useDispatch();
  const tournament = useSelector(selectTournament);
  const groupNames = useSelector(selectGroupNames);

  const [openTable, setOpenTable] = useState(true);
  const [openPlayOff, setOpenPlayOff] = useState(false);

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
      teamsCount: 16,
    };

    let groupStage = {};
    let teams = [];

    for (let team = 0; team < settings.teamsCount; team++) {
      teams.push(`Команда-${team + 1}`);
    }

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
    dispatch(addPlayOff(teams.length / settings.teamsInGroup));
  };

  const handleOpenComponent = (id) => {
    switch (id) {
      case "openTable": {
        setOpenPlayOff(false);
        setOpenTable(true);
        break;
      }
      case "openPlayOff": {
        setOpenTable(false);
        setOpenPlayOff(true);
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <div className={style.tournament}>
      <button type="button" onClick={handleGetTournament}>create</button>
      <button type="button" onClick={() => console.log(tournament)}>log</button>
      <button type="button" id="openTable" onClick={(e) => handleOpenComponent(e.target.id)}>Table</button>
      <button type="button" id="openPlayOff" onClick={(e) => handleOpenComponent(e.target.id)}>PlayOff</button>
      {!Object.values(tournament.groups).length || (
        <div>
          <div style={{ display: openTable ?  "flex" : "none" }} className={style.tournamentStage}>
            <Table />
            <Qualification />
          </div>
          <div style={{ display: openPlayOff ? "block" : "none" }}>
            <PlayOff />
          </div>
        </div>
      )}
    </div>
  );
};
