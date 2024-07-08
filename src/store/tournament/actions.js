export const ADD_TEAMS = "TEAMS::ADD_TEAMS";
export const ADD_GROUPS = "GROUPS::ADD_GROUPS";
export const ADD_MATCHES = "MATCHES::ADD_MATCHES";

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
