import React, { useState } from "react";
import { Teams } from "./data/teams";

const App = () => {
  const [teams, setTeams] = useState(
    Teams.map(t => {return {...t, picked: false}})
  )

  const pickedTeams = teams.filter(team =>  team.picked )
  const unpickedTeams = teams.filter(team =>  !team.picked )

  const pickTeam = (team) => {
    const newTeams = teams.map((currentTeam) => {
      if (currentTeam.name === team.name ) {
        return {...currentTeam, picked: true}
      }
      return currentTeam
    } )
    setTeams(newTeams)
  }

  const unpickTeam = (team) => {
    const newTeams = teams.map((currentTeam) => {
      if (currentTeam.name === team.name ) {
        return {...currentTeam, picked: false}
      }
      return currentTeam
    } )
    setTeams(newTeams)
  }

  return (
    <div className="w-full bg-gray-200 flex">
      <div className="container mx-auto my-5 bg-white rounded-lg border">
        <p className="text-center text-4xl">Super Sports App</p>
        <p className="text-center text-lg">pick your favorite Teams</p>

        <div className="flex">
          <div className="bg-blue-200 w-1/2 m-5 rounded p-4">
            {unpickedTeams.map((team, i) =>
              <Team key={i} action={pickTeam} team={team} />
            )}
          </div>

          <div className="bg-green-200 w-1/2 m-5 rounded p-4">
            {pickedTeams.map((team, i) =>
              <Team key={i} action={unpickTeam} team={team} />
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

const Team = ({team, action}) => {
  return <>
    <div
    onClick={() => action(team)}
    className="rounded p-3 mb-3 bg-gray-200 hover:bg-blue-600 hover:text-white">
      {team.city} {team.name}
    </div>
  </>

}

export default App;
