export const ADD_TEAMS = "TEAMS::ADD_TEAMS";
export const ADD_GROUPS = "GROUPS::ADD_GROUPS";

export const addTeams = (teams) => ({
  type: ADD_TEAMS,
  payload: teams,
});

export const addGroups = (groups) => ({
  type: ADD_GROUPS,
  payload: groups,
});
