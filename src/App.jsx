import React, {
  useContext,
  createContext,
  useReducer,
  useCallback
} from "react";
// import { Teams } from "./data/teams";
import { GroupedTeams } from "./data/teams";
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

// selectors
const pickedTeams = state => {
  console.log("sateat", state);
  return state.teams.filter(t => t.picked);
};
const unpickedTeams = state => {
  return state.teams.filter(t => !t.picked);
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
  // const pickedTeams = state.teams.filter(t => t.picked);
  // const unpickedTeams = state.teams.filter(t => !t.picked);

  return {
    state,
    dispatch,
    toggleTeam,
    pickedTeams: pickedTeams(state),
    unpickedTeams: unpickedTeams(state)
  };
};

const TeamsContextProvider = props => {
  const [state, dispatch] = useReducer(teamsReducer, {
    teams: GroupedTeams.group1
  });
  const value = React.useMemo(() => [state, dispatch], [state]);
  return <TeamsContext.Provider value={value} {...props} />;
};

const App = () => {
  return (
    <TeamsContextProvider>
      <TeamsPage />
    </TeamsContextProvider>
  );
};

const TeamsPage = () => {
  const { state, pickedTeams, unpickedTeams, toggleTeam } = useTeams();
  console.log(state);
  return (
    <div className="w-full min-h-screen bg-gray-200 flex">
      <div className="container mx-auto my-5 bg-white rounded-lg border">
        <p className="text-center text-4xl">Super Sports App</p>
        <p className="text-center text-lg">pick your favorite Teams</p>

        <div className="flex">
          <div className="bg-blue-200 w-1/2 m-5 rounded p-4">
            {unpickedTeams.map((team, i) => (
              <Team key={team.name} action={toggleTeam} team={team} />
            ))}
          </div>

          <div className="bg-green-200 w-1/2 m-5 rounded p-4">
            {pickedTeams.map((team, i) => (
              <Team key={team.name} action={toggleTeam} team={team} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Team = React.memo(({ team, action }) => {
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
});

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

export default App;
