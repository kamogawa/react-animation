import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/react-netflix/tv">
          <Tv />
        </Route>
        <Route path="/react-netflix/search">
          <Search />
        </Route>
        <Route path="/react-netflix">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;