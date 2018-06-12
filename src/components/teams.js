import React from "react";

const Teams = props => {
  // let scope = this;   // to be able to use this scope(for classes) inside any callback function
  let namesList = props.teams.map(name => {
    let abbr = name.match(/[A-Z]/g).join('')
    return <li
      key={abbr}
      onClick={props.getTeamYearWins.bind(this, abbr)}
      style={{ paddingTop: "0.5em", cursor: "pointer" }}
    >{name}</li>;
  })
  return (
    <div>
      <h2>Teams</h2>
      <h4>Teams participated across seasons.</h4>
      <ul style={{ listStyleType: "none" }}>{namesList}</ul>
    </div >
  )
}

export default Teams;