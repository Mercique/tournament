import { ADD_GROUPS, ADD_MATCHES, ADD_TEAMS } from "./actions";

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
    default:
      return state;
  }
};
