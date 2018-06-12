import React from "react";

const Wins = props => {
  let teamList = props.shortTeamNames.map((name, i) => {
    return <li
      key={i}
      // onClick={props.getTeamYearWins.bind(this, abbr)}
      style={{ paddingRight: "1em", cursor: "pointer", display: "inline-block" }}
    ><b>{name}</b></li>;
  })
  let currTeam = Object.keys(props.wins)[0]
  let currShortTeam = currTeam.match(/[A-Z]/g).join('')
  console.log(currShortTeam)
  let winList = []
  for (const yr of Object.keys(props.wins[currTeam])) {
    winList.push(<li
      key={yr}
      onClick={props.getTeamYearDetails.bind(this, currShortTeam, yr)}
      style={{ paddingTop: "0.5em", cursor: "pointer" }}
    >{yr} => {props.wins[currTeam][yr]}</li>)
  }
  return (
    <div>
      <div style={{ backgroundColor: "#636161", marginBottom: "1em" }}>
        <ul style={{ listStyleType: "none", padding: "1em" }}>{teamList}</ul>
      </div>
      <h2>{currTeam}</h2>
      <h4>Wins each Year</h4>
      <ul style={{ listStyleType: "none" }}>{winList}</ul>
    </div >
  )
}

export default Wins;