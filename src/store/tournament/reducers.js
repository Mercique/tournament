import { ADD_GROUPS, ADD_MATCHES, ADD_TEAMS, UPDATE_GROUPS, UPDATE_MATCHES } from "./actions";

const initialState = {
  groupNames: [
    "A", "B", "C", "D", "E", "F", "G", "H",
    "I", "G", "K", "L", "M", "N", "O", "P",
  ],
  teams: [],
  groups: {},
  matches: {},
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
      if (typeof state.matches[action.payload.tour] === "undefined") {
        state.matches[action.payload.tour] = [];
      }

      return {
        ...state,
        matches: {
          ...state.matches,
          [action.payload.tour]: [
            ...state.matches[action.payload.tour],
            action.payload.match,
          ],
        },
      };
    case UPDATE_GROUPS:
      for (let team = 0; team < action.payload.length; team++) {
        state.groups[action.payload[team].groupName][`team-${action.payload[team].id}`].lastMatches[action.payload[team].match[0]] = action.payload[team].match[1];
        
        for (let key in action.payload[team].stat) {
          state.groups[action.payload[team].groupName][`team-${action.payload[team].id}`].stat[key] += action.payload[team].stat[key];
        }
      }

      return {...state};
    case UPDATE_MATCHES:
      console.log(action.payload);
      for (let team = 0; team < action.payload.length; team++) {
        console.log(state.matches[action.payload[team].tour[0]][action.payload[team].tour[1]][team]);
        state.matches[action.payload[team].tour[0]][action.payload[team].tour[1]][team].scored = action.payload[team].stat.scored;
        state.matches[action.payload[team].tour[0]][action.payload[team].tour[1]][team].missed = action.payload[team].stat.missed;
      }

      return {...state};
    default:
      return state;
  }
};
