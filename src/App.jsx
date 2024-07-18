import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Tournament } from "./components/Tournament/Tournament";
import { Settings } from "./components/Settings/Settings";
import { useState } from "react";

const App = () => {
  const [create, setCreate] = useState(true);

  const openTournament = () => {
    setCreate(false);
  };

  return (
    <div className="App">
      <div className="App__wrapper">
        <Header />
        <div className="App__wrapper-top center">
          {create ? (
            <Settings openTournament={openTournament} />
          ) : (
            <Tournament />
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
