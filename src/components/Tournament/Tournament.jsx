import style from "./Tournament.module.css";
import { selectTournament } from "../../store/tournament/selectors";
import { useSelector } from "react-redux";
import { Table } from "../Table/Table";
import { Qualification } from "../Qualification/Qualification";
import { PlayOff } from "../PlayOff/PlayOff";
import { useState } from "react";

export const Tournament = () => {
  const tournament = useSelector(selectTournament);

  const [openStage, setOpenStage] = useState(true);

  const handleClearLocalStorage = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <div className={style.tournament}>
      <button type="button" onClick={() => console.log(tournament)}>log</button>
      <button type="button" onClick={handleClearLocalStorage}>clear cookie</button>
      {tournament.settings.groupsCount > 1 && (
        <div>
          <button type="button" id="openTable" onClick={() => setOpenStage(true)}>Table</button>
          <button type="button" id="openPlayOff" onClick={() => setOpenStage(false)}>PlayOff</button>
        </div>
      )}
      {!Object.values(tournament.groups).length || (
        <div>
          <div className={style.tournamentStage} style={{ display: openStage ?  "flex" : "none" }}>
            <Table />
            <Qualification />
          </div>
          {tournament.settings.groupsCount > 1 && (
            <div className={style.tournamentPlayOff} style={{ display: !openStage ? "flex" : "none" }}>
              <PlayOff />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
