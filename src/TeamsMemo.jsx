import React, {
  useContext,
  createContext,
  useReducer,
  useCallback
} from "react";
import { Teams } from "./data/teams";
import { useRenders } from "./utils/use_renders";

const teamsReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_TEAM":
      return {
        ...state,
        teams: state.teams.map(t => {
          return t.name === action.teamName ? { ...t, picked: !t.picked } : t;
        })
      };
    default:
      throw new Error(`passed invalid or unknown action.type: ${action.type}`);
  }
};

const TeamsContext = createContext(null);

const useTeams = () => {
  const [state, dispatch] = useContext(TeamsContext);

  const toggleTeam = useCallback(
    teamName => {
      dispatch({ type: "TOGGLE_TEAM", teamName });
    },
    [dispatch]
  );

  return {
    state,
    dispatch,
    toggleTeam,
    pickedTeams: state.teams.filter(t => t.picked),
    unpickedTeams: state.teams.filter(t => !t.picked)
  };
};

const TeamsContextProvider = props => {
  const [state, dispatch] = useReducer(teamsReducer, {
    teams: Teams
  });
  const value = React.useMemo(() => [state, dispatch], [state]);
  return <TeamsContext.Provider value={value} {...props} />;
};

const TeamsPage = () => {
  const { pickedTeams, unpickedTeams, toggleTeam } = useTeams();
  return (
    <div className="w-full min-h-screen bg-gray-200 flex px-32">
      <div className="container mx-auto my-5 bg-white rounded-lg border">
        <HeaderComponent />
        <div className="flex">
          <div className="w-1/2 m-5">
            <p className="text-center text-4xl">Pick Teams</p>
            <div className="w-full h-px bg-gray-300 mb-4"></div>
            <div className=" w-full p-4">
              {unpickedTeams.map(team => (
                <Team key={team.name} action={toggleTeam} team={team} />
              ))}
            </div>
          </div>
          <div className="w-1/2 m-5">
            <p className="text-center text-4xl">Selected Teams</p>
            <div className="w-full h-px bg-gray-300 mb-4"></div>
            <div className="h-full p-4">
              {pickedTeams.map(team => (
                <Team key={team.name} action={toggleTeam} team={team} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeaderComponent = () => {
  const renders = useRenders();
  return (
    <div className="relative">
      <p className="text-center text-4xl">Super Sports App</p>
      <p className="text-center text-2xl">pick your favorite teams</p>
      <p className="text-2xl absolute top-0 right-0 px-5 pt-2">
        Renders: {renders}
      </p>
    </div>
  );
};

const Team = React.memo(({ team, action }) => {
  const renders = useRenders();
  const pickedClasses =
    "group rounded border border-green-600 bg-green-100 cursor-pointer p-3 mb-3 hover:bg-red-100 hover:border-red-600";
  const unpickedClasses =
    "group rounded border border-gray-500 cursor-pointer p-3 mb-3 hover:bg-blue-100 hover:border-blue-600";

  return (
    <>
      <div
        className={team.picked ? pickedClasses : unpickedClasses}
        onClick={() => action(team.name)}
      >
        <div className="flex m-auto">
          <img
            className="rounded h-24 m-2 "
            src={require(`./images/nfl_logos/${team.abr}.png`)}
            alt=""
          />
          <div className="flex-1">
            <p className="text-4xl">
              {team.city} {team.name}
            </p>
            <p className="text-2xl"> Renders: {renders} </p>
          </div>
        </div>
      </div>
    </>
  );
});

const TeamsMemo = () => {
  return (
    <TeamsContextProvider>
      <TeamsPage />
    </TeamsContextProvider>
  );
};

export default TeamsMemo;
