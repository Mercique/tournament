import { createStore, combineReducers } from "redux";
import { tournamentReducer } from "./tournament/reducers";
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  tournament: tournamentReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["tournament"],
  //blacklist: ["tournament"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);
