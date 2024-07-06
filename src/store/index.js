import { createStore, combineReducers } from "redux";
import { tournamentReducer } from "./tournament/reducers";

const rootReducer = combineReducers({
  tournament: tournamentReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
