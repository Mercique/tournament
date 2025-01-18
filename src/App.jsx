import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Tournament } from "./components/Tournament/Tournament";
import { Settings } from "./components/Settings/Settings";
import { useSelector } from "react-redux";
import { selectIdTournament } from "./store/tournament/selectors";

const App = () => {
  const checkCreate = useSelector(selectIdTournament);

  return (
    <div className="App">
      <Header />
      <main className="App__main">
        {checkCreate === null ? (
          <Settings />
        ) : (
          <Tournament />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
