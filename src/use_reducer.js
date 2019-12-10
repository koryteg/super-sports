// const value = React.useMemo(() => [count, setCount], [count])
import React from "react";
import { getUser, updateUser } from "data";

const AppContext = React.createContext(null);

const currentUserReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_AVATAR": {
      return { ...state, avatar: action.avatar };
    }
    default: {
      throw new Error(`passed invalid or unknown action.type: ${action.type}`);
    }
  }
};

const CurrentUserProvider = props => {
  const user = getUser();
  const [state, dispatch] = React.useReducer(currentUserReducer, { user });
  return <AppContext.Provider value={[state, dispatch]} {...props} />;
};

// const useCurrentUser = () => {
//   const [state, dispatch] = React.useContext(AppContext);

//   const updateAvatar = async avatar => {
//     let user = await updateUser({ userId: state.id, avatar });
//     dispatch({ type: "UPDATE_AVATAR", avatar: user.avatar });
//   };
//   return {state, dispatch, updateAvatar}
// };

const App = () => {
  return (
    <CurrentUserProvider>
      <UserProfilePage />
    </CurrentUserProvider>
  );
};

const UserProfilePage = () => {
  const [user, dispatch] = React.useContext(AppContext);
  return (
    <>
      <UserProfileInfo userName={user.name} userEmail={user.email} />
      <UserProfileBody user={user} />
    </>
  );
};

const useCurrentUser = () => {
  const [state, dispatch] = React.useContext(AppContext);

  const updateAvatar = async avatar => {
    let user = await updateUser({ userId: state.id, avatar });
    dispatch({ type: "UPDATE_AVATAR", avatar: user.avatar });
  };
  return { state, dispatch, updateAvatar };
};

const UserProfilePage = () => {
  const { user, updateAvatar } = useCurrentUser();
  return (
    <>
      <UserProfileInfo userName={user.name} userEmail={user.email} />
      <UserProfileAvatar userAvatar={user.avatar} updateAvatar={updateAvatar} />
      {/* render the rest of the profile page */}
    </>
  );
};

// if you have static data.
const UserProfileInfo = React.memo(({ userName, userEmail }) => {
  return (
    <h1>
      {" "}
      {userName} - {userEmail}{" "}
    </h1>
  );
});

const App = () => {
  return (
    <CurrentUserProvider>
      <UserProfilePage />
    </CurrentUserProvider>
  );
};
