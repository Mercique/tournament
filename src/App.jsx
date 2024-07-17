import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Tournament } from "./components/Tournament/Tournament";
import { Settings } from "./components/Settings/Settings";

const App = () => {
  return (
    <div className="App">
      <div className="App__wrapper">
        <Header />
        <div className="App__wrapper-top center">
          <Settings />
          <Tournament />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
