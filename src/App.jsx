import React from "react";
import TeamsMemo from "./TeamsMemo";
import TeamsSlow from "./TeamsSlow";
import { Router } from "@reach/router";

const App = () => {
  return (
    <Router>
      <TeamsSlow path="/" />
      <TeamsMemo path="/teams-memo" />
    </Router>
  );
};

export default App;
