import React, {Fragment} from "react";

const Wins = props => {
  let teamList = props.shortTeamNames.map((name, i) => {
    return <li
      key={i}
      onClick={props.getTeamYearWins.bind(this, name)}
    ><b>{name}</b></li>;
  })
  let currTeam = Object.keys(props.wins)[0]
  let currShortTeam = currTeam.match(/[A-Z]/g).join('')
  console.log(currShortTeam)
  let winList = []
  for (const yr of Object.keys(props.wins[currTeam])) {
    winList.push(<li
      key={yr}
      onClick={props.getTeamYearDetails.bind(this, currShortTeam, yr, Object.keys(props.wins[currTeam]))}
    >{yr} => {props.wins[currTeam][yr]}</li>)
  }
  return (
    <Fragment>
      <div className="navbar" >
        <ul>{teamList}</ul>
      </div>
      <h2>{currTeam}</h2>
      <h4>Wins each Year</h4>
      <ul>{winList}</ul>
    </Fragment >
  )
}

export default Wins;