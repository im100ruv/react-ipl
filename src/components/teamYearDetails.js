import React from "react";

const TeamYearDetails = props => {
  let detailList = props.details.map((obj, i) => {
    let team1 = obj.team1.match(/[A-Z]/g).join('')
    let team2 = obj.team2.match(/[A-Z]/g).join('')
    let winner = obj.winner.match(/[A-Z]/g).join('')
    return <li
      key={i}
      style={{ paddingTop: "0.5em"}}
    >{obj.date} | {team1}  vs  {team2} | {winner} | {obj.MoM} | {obj.venue} | {obj.city}</li>;
  })
  return (
    <div>
      <h2>{props.name}</h2>
      <h4>Details of {props.yr}</h4>
      <ul style={{ listStyleType: "none" }}>
        <li><b>Date | Team1 vs Team2 | Winner | MoM | Venue | City</b></li>
        {detailList}
      </ul>
    </div >
  )
}

export default TeamYearDetails;