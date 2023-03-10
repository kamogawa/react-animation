import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import TopNav from "./routes/component/TopNav";

function Router() {
  return (
    <BrowserRouter>
      <TopNav/>
      <Switch>
        <Route path="/coin_tracker/:coinId">
          <Coin/>
        </Route>
        <Route path="/coin_tracker">
          <Coins/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;