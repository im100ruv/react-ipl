import React, { Fragment } from "react";

const TeamYearDetails = props => {
  let yearList = props.yearList.map((yr, i) => {
    return <li
      key={i}
      onClick={props.getTeamYearDetails.bind(this, props.name, yr, props.yearList)}
    ><b>{yr}</b></li>;
  })
  let detailList = props.details.map((obj, i) => {
    let team1 = obj.team1.match(/[A-Z]/g).join('')
    let team2 = obj.team2.match(/[A-Z]/g).join('')
    let winner = ""
    if (obj.winner === "") {
      winner = "No Result"
    } else {
      winner = obj.winner.match(/[A-Z]/g).join('')
    }
    return <li
      key={i}
      className="nolink"
    >{obj.date} | {team1}  vs  {team2} | {winner} | {obj.MoM} | {obj.venue} | {obj.city}</li>;
  })
  return (
    <Fragment>
      <div className="navbar" >
        <ul>{yearList}</ul>
      </div>
      <div
        className="back"
        onClick={props.getTeamYearWins.bind(this, props.name)}
      >
        &lt;= Back
      </div>
      <h2>{props.name}</h2>
      <h4>Details of {props.yr}</h4>
      <ul>
        <li><b>Date | Team1 vs Team2 | Winner | MoM | Venue | City</b></li>
        {detailList}
      </ul>
    </Fragment >
  )
}

export default TeamYearDetails;