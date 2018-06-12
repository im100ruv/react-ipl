import React, { Component } from 'react';
import './App.css';
import Main from './components/mainComponent';
import Home from './components/home';
import Teams from './components/teams';
import Players from './components/players';
import Wins from './components/wins';
import TeamYearDetails from './components/teamYearDetails';

class App extends Component {
  state = {
    shortTeamNames: undefined,
    comp: <Home />
  }
  setHome = () => {
    this.setState({
      comp: <Home />
    })
  }
  getTeams = async (e) => {
    e.preventDefault()
    const api_call = await fetch('http://localhost:8082/api/teams')
    const teamNames = await api_call.json()
    let shortTeamNames = teamNames.map(name => {
      let abbr = name.match(/[A-Z]/g).join('')
      return abbr;
    })
    this.setState({
      shortTeamNames: shortTeamNames,
      comp: <Teams teams={teamNames} getTeamYearWins={this.getTeamYearWins} />
    })
  }
  getPlayers = async (e) => {
    e.preventDefault()
    // const api_call = await fetch('http://localhost:8082/api/teams')
    // const teamNames = await api_call.json()
    // this.setState({
    //   comp: <Teams teams={teamNames}/>
    // })
  }
  getTeamYearWins = async (key) => {
    const api_call = await fetch(`http://localhost:8082/api/teams/${key}`)
    const teamWins = await api_call.json()
    this.setState({
      comp: <Wins wins={teamWins} getTeamYearDetails={this.getTeamYearDetails} shortTeamNames={this.state.shortTeamNames} />
    })
  }

  getTeamYearDetails = async (shortTeam, yr) => {
    const api_call = await fetch(`http://localhost:8082/api/teams/${shortTeam}/${yr}`)
    const teamYearDetails = await api_call.json()
    this.setState({
      comp: <TeamYearDetails details={teamYearDetails} yr={yr} name={shortTeam}/>
    })
  }

  render() {
    return (
      <div className="App">
        <div style={{ display: "flex", height: "40.8em" }}>
          <div
            style={{
              padding: "1.5em",
              width: "15%",
              background: "#f0f0f0"
            }}
          >
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li onClick={this.setHome} style={{ paddingTop: "0.5em", cursor: "pointer" }}> Home </li>
              <li onClick={this.getTeams} style={{ paddingTop: "0.5em", cursor: "pointer" }}> Teams </li>
              <li onClick={this.getPlayers} style={{ paddingTop: "0.5em", cursor: "pointer" }}> Players </li>
            </ul>
          </div>

          <div id="main-div" style={{ flex: 1, padding: "2em" }}>
            <Main comp={this.state.comp} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
