import React, { Component } from 'react';
import './App.css';
import Main from './components/mainComponent';
import Home from './components/home';
import Teams from './components/teams';
// import Players from './components/players';
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
      comp: <Teams
        teams={teamNames}
        getTeamYearWins={this.getTeamYearWins}
      />
    })
  }
  getPlayers = async (e) => {
    e.preventDefault()
    alert("Module under construction")
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
      comp: <Wins
        wins={teamWins}
        getTeamYearDetails={this.getTeamYearDetails}
        shortTeamNames={this.state.shortTeamNames}
        getTeamYearWins={this.getTeamYearWins}
      />
    })
  }

  getTeamYearDetails = async (shortTeam, yr, yearList) => {
    const api_call = await fetch(`http://localhost:8082/api/teams/${shortTeam}/${yr}`)
    const teamYearDetails = await api_call.json()
    this.setState({
      comp: <TeamYearDetails
        details={teamYearDetails}
        yr={yr}
        yearList={yearList}
        name={shortTeam}
        getTeamYearDetails={this.getTeamYearDetails}
        getTeamYearWins={this.getTeamYearWins}
      />
    })
  }

  render() {
    return (
      <div className="app">
        <div className="sidebar" >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li onClick={this.setHome} > Home </li>
            <li onClick={this.getTeams} > Teams </li>
            <li onClick={this.getPlayers} > Players </li>
          </ul>
        </div>

        <div className="main">
          <Main comp={this.state.comp} />
        </div>
      </div>
    );
  }
}

export default App;
