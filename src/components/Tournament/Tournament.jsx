import { addGroups, addMatches, addPlayOff } from "../../store/tournament/actions";
import { selectGroupNames, selectSettings, selectTournament } from "../../store/tournament/selectors";
import { getRandomInt } from "../../utils/functions";
import style from "./Tournament.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../Table/Table";
import { Qualification } from "../Qualification/Qualification";
import { PlayOff } from "../PlayOff/PlayOff";
import { useState } from "react";

export const Tournament = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  const tournament = useSelector(selectTournament);
  const groupNames = useSelector(selectGroupNames);

  const [openStage, setOpenStage] = useState(true);

  const handleGetMatches = (group, stage, range) => {
    const groupTeams = Object.keys(group);
    const numRounds = groupTeams.length % 2 === 0 ? groupTeams.length - 1 : groupTeams.length;

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

        groupTeams.splice(0, 0, groupTeams.pop());
      }
    }
  };

  const handleGetTournament = () => {
    let groupStage = {};
    let teams = [];

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
            homeDraw: 0,
          },
          lastMatches: [],
        };

        for (let last = 0; last < (settings.teamsInGroup <= 5 ? settings.teamsInGroup - 1 : 5); last++) {
          groupStage[groupNames[group]][`team-${team + 1}`].lastMatches[last] = "empty";
        }
      }

      handleGetMatches(groupStage[groupNames[group]], "groupStage", settings.rangeCircle);
    }

    dispatch(addGroups(groupStage));

    if (settings.teamsInGroup !== settings.teamsCount) {
      dispatch(addPlayOff(teams.length / settings.teamsInGroup));
    }
  };

  return (
    <div className={style.tournament}>
      <button type="button" onClick={handleGetTournament}>create</button>
      <button type="button" onClick={() => console.log(tournament)}>log</button>
      <button type="button" id="openTable" onClick={() => setOpenStage(true)}>Table</button>
      <button type="button" id="openPlayOff" onClick={() => setOpenStage(false)}>PlayOff</button>
      {!Object.values(tournament.groups).length || (
        <div>
          <div className={style.tournamentStage} style={{ display: openStage ?  "flex" : "none" }}>
            <Table />
            <Qualification />
          </div>
          {!Object.values(tournament.qualification.playOff).length || (
            <div className={style.tournamentPlayOff} style={{ display: !openStage ? "flex" : "none" }}>
              <PlayOff />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
