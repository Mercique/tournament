import { ADD_GROUPS, ADD_TEAMS } from "./actions";

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
    default:
      return state;
  }
};
