import { ADD_GROUPS, ADD_MATCHES, ADD_PLAYOFF, ADD_SETTINGS, ADD_TEAMS, UPDATE_GROUPS, UPDATE_MATCHES, UPDATE_PLAYOFF } from "./actions";

const initialState = {
  settings: {
    teamsInGroup: 4,
    rangeCircle: 1,
  },
  groupNames: [
    "A", "B", "C", "D", "E", "F", "G", "H",
    "I", "J", "K", "L", "M", "N", "O", "P",
  ],
  teams: [],
  groups: {},
  qualification: {
    groupStage: {
      name: "Групповая стадия",
      matches: {},
    },
    playOff: {
      name: "Плей-офф",
      matches: {},
    },
  },
};

export const tournamentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SETTINGS:
      return {
        ...state,
        settings: action.payload,
      };
    case ADD_TEAMS:
      return {
        ...state,
        teams: action.payload,
      };
    case ADD_GROUPS:
      return {
        ...state,
        groups: action.payload,
      };
    case ADD_PLAYOFF:
      for (let playOffStage = action.payload; playOffStage > 1; playOffStage /= 2) {
        state.qualification.playOff.matches[`1/${playOffStage} stage`] = [];

        for (let matchInStage = 0; matchInStage < playOffStage; matchInStage++) {
          const match = {
            stage: `1/${playOffStage} stage`,
            home: {
              name: "###",
              scored: "",
            },
            visit: {
              name: "###",
              scored: "",
            },
          };

          if (playOffStage === 2 && matchInStage === 0) {
            state.qualification.playOff.matches[`3nd place`] = [{...match, stage: `3nd place`}];
            state.qualification.playOff.matches[`Final`] = [{...match, stage: `Final`}];
          }

          state.qualification.playOff.matches[`1/${playOffStage} stage`][matchInStage] = match;
        }
      }

      return state;
    case UPDATE_PLAYOFF: {
      const playOffMatches = state.qualification.playOff.matches;

      const homeTeam = {...action.payload.home, scored: ""};
      const visitTeam = {...action.payload.visit, scored: ""};

      switch (action.payload.from) {
        case "groupStage": {
          for (let match = 0; match < 2; match++) {
            if (action.payload.groupId % 2 === 0) {
              playOffMatches[`1/${action.payload.stage} stage`][action.payload.groupId].home = action.payload.teams.firstPlace;
              playOffMatches[`1/${action.payload.stage} stage`][action.payload.groupId + 1].visit = action.payload.teams.secondPlace;
            } else {
              playOffMatches[`1/${action.payload.stage} stage`][action.payload.groupId - 1].visit = action.payload.teams.firstPlace;
              playOffMatches[`1/${action.payload.stage} stage`][action.payload.groupId].home = action.payload.teams.secondPlace;
            }
          }
          break;
        }
        case "playOff": {
          if (action.payload.stage === 1) {
            if (action.payload.home.scored > action.payload.visit.scored) {
              playOffMatches["Final"][0].home = action.payload.home;
              console.log("2 место - ", action.payload.visit.name);
              console.log("1 место - ", action.payload.home.name);
            } else {
              playOffMatches["Final"][0].visit = action.payload.visit;
              console.log("2 место - ", action.payload.home.name);
              console.log("1 место - ", action.payload.visit.name);
            }
          } else if (action.payload.stage === 3) {
            if (action.payload.home.scored > action.payload.visit.scored) {
              playOffMatches["3nd place"][0].home = action.payload.home;
              console.log("4 место - ", action.payload.visit.name);
              console.log("3 место - ", action.payload.home.name);
            } else {
              playOffMatches["3nd place"][0].visit = action.payload.visit;
              console.log("4 место - ", action.payload.home.name);
              console.log("3 место - ", action.payload.visit.name);
            }
          } else if (action.payload.stage > 2) {
            if (action.payload.home.scored > action.payload.visit.scored) {
              if (playOffMatches[`1/${action.payload.stage / 2} stage`][Math.floor(action.payload.matchId / 2)].home.id) {
                playOffMatches[`1/${action.payload.stage / 2} stage`][Math.floor(action.payload.matchId / 2)].visit = homeTeam;
              } else {
                playOffMatches[`1/${action.payload.stage / 2} stage`][Math.floor(action.payload.matchId / 2)].home = homeTeam;
              }
            } else {
              if (playOffMatches[`1/${action.payload.stage / 2} stage`][Math.floor(action.payload.matchId / 2)].home.id) {
                playOffMatches[`1/${action.payload.stage / 2} stage`][Math.floor(action.payload.matchId / 2)].visit = visitTeam;
              } else {
                playOffMatches[`1/${action.payload.stage / 2} stage`][Math.floor(action.payload.matchId / 2)].home = visitTeam;
              }
            }
          } else {
            if (action.payload.home.scored > action.payload.visit.scored) {
              if (playOffMatches["Final"][0].home.id) {
                playOffMatches["Final"][0].visit = homeTeam;
                playOffMatches["3nd place"][0].visit = visitTeam;
              } else {
                playOffMatches["Final"][0].home = homeTeam;
                playOffMatches["3nd place"][0].home = visitTeam;
              }
            } else {
              if (playOffMatches["Final"][0].home.id) {
                playOffMatches["Final"][0].visit = visitTeam;
                playOffMatches["3nd place"][0].visit = homeTeam;
              } else {
                playOffMatches["Final"][0].home = visitTeam;
                playOffMatches["3nd place"][0].home = homeTeam;
              }
            }
          }
          break;
        }
        default: {
          break;
        }
      }

      return {
        ...state,
        qualification: {
          ...state.qualification,
          playOff: {
            ...state.qualification.playOff,
            matches: {
              ...state.qualification.playOff.matches,
              ...playOffMatches,
            },
          },
        },
      };
    }
    case ADD_MATCHES:
      if (!state.qualification[action.payload.stage].matches[action.payload.tourName]) {
        state.qualification[action.payload.stage].matches[action.payload.tourName] = [];
      }

      return {
        ...state,
        qualification: {
          ...state.qualification,
          [action.payload.stage]: {
            ...state.qualification[action.payload.stage],
            matches: {
              ...state.qualification[action.payload.stage].matches,
              [action.payload.tourName]: [
                ...state.qualification[action.payload.stage].matches[action.payload.tourName],
                action.payload,
              ],
            },
          },
        },
      };
    case UPDATE_GROUPS:
      let sortGroup = [];

      for (let team in action.payload.teamSide) {
        state
          .groups[action.payload.groupName][`team-${action.payload.teamSide[team].id}`]
          .lastMatches[`match-${action.payload.tourName.slice(-1)}`] = action.payload.teamSide[team].status;

          for (let data in action.payload.teamSide[team].stat) {
            state
              .groups[action.payload.groupName][`team-${action.payload.teamSide[team].id}`]
              .stat[data] += action.payload.teamSide[team].stat[data];
          }
      }

      for (let team in state.groups[action.payload.groupName]) {
        const groupTeam = state.groups[action.payload.groupName][team];

        let points = groupTeam.stat.points;
        let diff = (groupTeam.stat.scored - groupTeam.stat.missed) / 10;
        let scored = groupTeam.stat.scored / 100;
        let games = groupTeam.stat.games / 1000;
        let checkHomeLossGame = groupTeam.stat.homeLoss * (-0.0001);

        let sortPoints = (points + diff + scored + games + checkHomeLossGame).toFixed(5);

        sortGroup.push({team, groupTeam, sortPoints});
      }

      sortGroup.sort((a, b) => b.sortPoints - a.sortPoints);
      state.groups[action.payload.groupName] = {};
      sortGroup.forEach((team) => state.groups[action.payload.groupName][team.team] = team.groupTeam);

      return {...state};
    case UPDATE_MATCHES:
      state.qualification[action.payload.stage].matches[action.payload.tourName][action.payload.matchId] = action.payload;

      return {...state};
    default:
      return state;
  }
};
