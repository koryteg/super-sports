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

  const toggleTeam = teamName => {
    dispatch({ type: "TOGGLE_TEAM", teamName });
  };

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
  return <TeamsContext.Provider value={[state, dispatch]} {...props} />;
};

const AppSlow = () => {
  return (
    <TeamsContextProvider>
      <TeamsPage />
    </TeamsContextProvider>
  );
};

const TeamsPage = () => {
  const { pickedTeams, unpickedTeams, toggleTeam } = useTeams();
  return (
    <ContainerComponent>
      <div className="bg-blue-200 w-1/2 m-5 rounded p-4">
        {unpickedTeams.map(team => (
          <Team key={team.name} action={toggleTeam} team={team} />
        ))}
      </div>
      <div className="bg-green-200 w-1/2 m-5 rounded p-4">
        {pickedTeams.map(team => (
          <Team key={team.name} action={toggleTeam} team={team} />
        ))}
      </div>
    </ContainerComponent>
  );
};

const ContainerComponent = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-gray-200 flex">
      <div className="container mx-auto my-5 bg-white rounded-lg border">
        <HeaderComponent />
        <div className="flex">{children}</div>
      </div>
    </div>
  );
};

const HeaderComponent = () => {
  const renders = useRenders();
  return (
    <>
      <p className="text-center text-4xl">Super Sports App</p>
      <p className="text-center text-lg">pick your favorite Teams</p>
      <p className="text-center text-lg">renders: {renders}</p>
    </>
  );
};

const Team = ({ team, action }) => {
  const renders = useRenders();
  return (
    <>
      <div
        onClick={() => action(team.name)}
        className="rounded p-3 mb-3 bg-gray-200 hover:bg-blue-600 hover:text-white"
      >
        {team.city} {team.name} - renders: {renders}
      </div>
    </>
  );
};

// const App = () => {
//   const [teams, setTeams] = useState(GroupedTeams);
//   const [group, setGroup] = useState(GroupedTeams.group1);

//   const pickedTeams = group.filter(team => team.picked);
//   const unpickedTeams = group.filter(team => !team.picked);

//   // const pickedTeams = useMemo(() => group.filter(team => team.picked), [group])
//   // const unpickedTeams = useMemo(() => group.filter(team => !team.picked), [group])

//   const pickTeam = useCallback(
//     team => {
//       setGroup(g => {
//         return g.map(currentTeam => {
//           if (currentTeam.name === team.name) {
//             return { ...currentTeam, picked: true };
//           }
//           return currentTeam;
//         });
//       });
//     },
//     [setGroup]
//   );

//   const unpickTeam = useCallback(
//     team => {
//       setGroup(g => {
//         return g.map(currentTeam => {
//           if (currentTeam.name === team.name) {
//             return { ...currentTeam, picked: false };
//           }
//           return currentTeam;
//         });
//       });
//     },
//     [setGroup]
//   );

//   return (
//     <div className="w-full min-h-screen bg-gray-200 flex">
//       <div className="container mx-auto my-5 bg-white rounded-lg border">
//         <p className="text-center text-4xl">Super Sports App</p>
//         <p className="text-center text-lg">pick your favorite Teams</p>

//         <div className="flex">
//           <div className="bg-blue-200 w-1/2 m-5 rounded p-4">
//             {unpickedTeams.map((team, i) => (
//               <Team key={i} action={pickTeam} team={team} />
//             ))}
//           </div>

//           <div className="bg-green-200 w-1/2 m-5 rounded p-4">
//             {pickedTeams.map((team, i) => (
//               <Team key={i} action={unpickTeam} team={team} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default AppSlow;
