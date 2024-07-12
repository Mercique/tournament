import { ADD_GROUPS, ADD_MATCHES, ADD_PLAYOFF, ADD_SETTINGS, ADD_TEAMS, UPDATE_GROUPS, UPDATE_MATCHES } from "./actions";

const initialState = {
  settings: {
    teamsInGroup: 4,
    rangeCircle: 1,
  },
  groupNames: [
    "A", "B", "C", "D", "E", "F", "G", "H",
    "I", "G", "K", "L", "M", "N", "O", "P",
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
            state.qualification.playOff.matches[`3rd place`] = [];
            state.qualification.playOff.matches[`final`] = [];

            state.qualification.playOff.matches[`3rd place`][matchInStage] = match;
            state.qualification.playOff.matches[`final`][matchInStage] = match;
          }

          state.qualification.playOff.matches[`1/${playOffStage} stage`][matchInStage] = match;
        }
      }

      return {...state};
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
