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
  const user = React.useContext(AppContext);
  return (
    <>
      <UserHeader user={user} />
      {/* Render rest of your user page */}
    </>
  );
};
