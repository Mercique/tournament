import { ADD_GROUPS, ADD_MATCHES, ADD_TEAMS, UPDATE_GROUPS, UPDATE_MATCHES } from "./actions";

const initialState = {
  groupNames: [
    "A", "B", "C", "D", "E", "F", "G", "H",
    "I", "G", "K", "L", "M", "N", "O", "P",
  ],
  teams: [],
  groups: {},
  qualification: {
    groupStage: {
      name: "Групповая стадия",
      data: {},
    },
    playOff: {
      name: "Плей-офф",
      data: {},
    },
  },
};

export const tournamentReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case ADD_MATCHES:
      if (typeof state.qualification.groupStage.data[action.payload.tour] === "undefined") {
        state.qualification.groupStage.data[action.payload.tour] = [];
      }

      return {
        ...state,
        qualification: {
          ...state.qualification,
          groupStage: {
            ...state.qualification.groupStage,
            data: {
              ...state.qualification.groupStage.data,
              [action.payload.tour]: [
                ...state.qualification.groupStage.data[action.payload.tour],
                action.payload.match,
              ],
            }
          }
        }
      };
    case UPDATE_GROUPS:
      let sortGroup = [];
      console.log(action.payload);
      for (let team = 0; team < action.payload.length; team++) {
        //state.groups[action.payload[team].groupName][`team-${action.payload[team].id}`].lastMatches[action.payload[team].match[0]] = action.payload[team].match[1];
        
        for (let key in action.payload[team].stat) {
          state.groups[action.payload[team].groupName][`team-${action.payload[team].id}`].stat[key] += action.payload[team].stat[key];
        }
      }

      for (let team in state.groups[action.payload[0].groupName]) {
        const groupTeam = state.groups[action.payload[0].groupName][team];

        let points = groupTeam.stat.points;
        let diff = (groupTeam.stat.scored - groupTeam.stat.missed) / 10;
        let scored = groupTeam.stat.scored / 100;
        let games = groupTeam.stat.games / 1000;
        let checkHomeLossGame = groupTeam.stat.homeLoss * (-0.0001);

        let sortPoints = (points + diff + scored + games + checkHomeLossGame).toFixed(5);

        sortGroup.push({team, groupTeam, sortPoints});
      }

      sortGroup.sort((a, b) => b.sortPoints - a.sortPoints);
      state.groups[action.payload[0].groupName] = {};
      sortGroup.forEach((team) => state.groups[action.payload[0].groupName][team.team] = team.groupTeam);

      return {
        ...state,
      };
    case UPDATE_MATCHES:
      // for (let team = 0; team < action.payload.length; team++) {
      //   state.qualification.groupStage.data[action.payload[team].tour[0]][action.payload[team].tour[1]][team].scored = action.payload[team].stat.scored;
      //   state.qualification.groupStage.data[action.payload[team].tour[0]][action.payload[team].tour[1]][team].missed = action.payload[team].stat.missed;
      // }

      return {...state};
    default:
      return state;
  }
};
