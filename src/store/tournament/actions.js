export const ADD_TEAMS = "TEAMS::ADD_TEAMS";
export const ADD_GROUPS = "GROUPS::ADD_GROUPS";
export const ADD_MATCHES = "MATCHES::ADD_MATCHES";
export const UPDATE_GROUPS = "GROUPS::UPDATE_GROUPS";
export const UPDATE_MATCHES = "MATCHES::UPDATE_MATCHES";

export const addTeams = (teams) => ({
  type: ADD_TEAMS,
  payload: teams,
});

export const addGroups = (groups) => ({
  type: ADD_GROUPS,
  payload: groups,
});

export const addMatches = (match) => ({
  type: ADD_MATCHES,
  payload: match,
});

export const updateGroups = (stat) => ({
  type: UPDATE_GROUPS,
  payload: stat,
});

export const updateMatches = (match) => ({
  type: UPDATE_MATCHES,
  payload: match,
});
