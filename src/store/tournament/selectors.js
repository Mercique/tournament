export const selectTournament = (state) => state.tournament;
export const selectGroupNames = (state) => state.tournament.groupNames;
export const selectTeams = (state) => state.tournament.teams;
export const selectGroups = (state) => state.tournament.groups;
export const selectQualification = (state) => state.tournament.qualification;
export const selectGroupStage = (state) => state.tournament.qualification.groupStage;
export const selectPlayOff = (state) => state.tournament.qualification.playOff;
export const selectSettings = (state) => state.tournament.settings;
