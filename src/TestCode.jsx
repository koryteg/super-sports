
// const value = React.useMemo(() => [count, setCount], [count])

import React, {useContext, createContext, useReducer} from 'react';
import { getUser, updateUser } from 'data';

const CurrentUserContext = createContext(null);


const currentUserReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_AVATAR': {
      return  {...state, avatar: action.avatar }
    }
    default: {
      throw new Error(`passed invalid or unknown action.type: ${action.type}`)
    }
  }
}

const CurrentUserProvider = (props) => {
  const user = getUser()
  const [ state, dispatch ] = useReducer(currentUserReducer, user )
  const value = React.useMemo(() => [state, dispatch], [state])
  return <CurrentUserContext.Provider value={value} {...props} />
}

const useCurrentUser = () => {
  const context = useContext(CurrentUserContext)
  const [state, dispatch] = context

  const updateAvatar = async (avatar) => {
    let user = await updateUser({userId: state.id, avatar})
    dispatch({type: "UPDATE_AVATAR", avatar: user.avatar})
  }
  return [state, dispatch, updateAvatar]
}

const UserProfilePage = () => {
  const [user, updateAvatar] = useCurrentUser()
  return <>
    <UserProfileInfo
      userName={user.name}
      userEmail={userEmail} />
    {/* updating the avatar takes a long time */}
    <UserProfileAvatar
      userAvatar={user.avatar}
      updateAvatar={updateAvatar} />

    <UserProfileBody user={user} />
  </>
}

// if you have static data.
const UserProfileInfo = React.memo( ({userName, userEmail}) => {
  return <h1> {userName} - {userEmail} </h1>
} )

const App = () => {
  return (
    <CurrentUserProvider>
      <UserProfilePage />
    </CurrentUserProvider>
  )
}





const Parent = () => {
	const [showExtraDetails, setShowExtraDetails] = useState(false);
	const handleClick = useCallback(
	  () => {
	    showData(showExtraDetails);
	  },
	  [showExtraDetails],
	);
	return (
		[...]
		<Child onClick={handleClick}/>
		[...]
	);
}




const App = () => {
  return (
    <AppProvider>
      <Router>
        <Home path="/" />
        <ManageTeams path="/teams" />
        <PickTeams path="/teams/pick" />
        <Team path="/teams/:team_id" />
      </Router>
    </AppProvider>
  )
}

const ManageTeams = () => {
  return (
    <ManageTeamsProvider>
      <TeamsHeader />
      <TeamsList />
      <TeamsForm />
    </ManageTeamsProvider>
  )
}














const everythingReducer = (state, action) => {
  switch (action.type) {
    case "TEAM_LOSS":
      return {
        ...state,
        games: state.games.map((game)=> {
          let loser = game.teams.find(team => team.id === action.teamId)
          if (loser) {
            return {...game, loser}
          } else {
            return game
          }
        })
      }
    default:
      return state
  }
}


const teamsReducer = (state, action) => {
  // ... stuff
}

const gamesReducer = (state, action) => {
  switch (action.type) {
    case "TEAM_LOSS":
      return {
        ...state,
        `${action.gameId}`: {
          ...state.games[action.gameId],
          losingTeamId: action.teamId
        }
      }
    default:
      return state
  }
}

