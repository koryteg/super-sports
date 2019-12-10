import React from "react";
import { getUser } from "api/users";

const AppContext = React.createContext(null);

const App = () => {
  const user = getUser();
  return (
    <AppContext.Provider value={user}>
      <UserProfilePage />
    </AppContext.Provider>
  );
};

const UserProfilePage = () => {
  return (
    <AppContext.Consumer>
      {user => <UserHeader user={user} />}
    </AppContext.Consumer>
  );
};
