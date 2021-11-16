import { FC } from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
import Chatroom from "./pages/Chatroom";

const Container: FC = () => (
  <Switch>
    <Route exact={true} path="/">
      <Main />
    </Route>
    <Route exact={true} path="/chatroom">
      <Chatroom />
    </Route>
  </Switch>
);

export default Container;
