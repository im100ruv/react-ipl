import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Teams from './components/Teams';
// import Players from './components/Players';
import Wins from './components/Wins';
import TeamYearDetails from './components/TeamYearDetails';

class App extends Component {
  state = {
    shortTeamNames: undefined,
    comp: {
      compName: "Home"
    }
  }

  setHome = () => {
    this.setState({
      comp: {
        compName: "Home"
      }
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
      comp: {
        compName: "Teams",
        teams: teamNames,
        getTeamYearWins: this.getTeamYearWins
      }
    })
  }

  getPlayers = async (e) => {
    e.preventDefault()
    alert("Module under construction")
    // const api_call = await fetch('http://localhost:8082/api/teams')
    // const teamNames = await api_call.json()
    // this.setState({
    //   comp: {}
    // })
  }

  getTeamYearWins = async (key) => {
    const api_call = await fetch(`http://localhost:8082/api/teams/${key}`)
    const teamWins = await api_call.json()
    this.setState({
      comp: {
        compName: "Wins",
        wins: teamWins,
        shortTeamNames: this.state.shortTeamNames,
        getTeamYearWins: this.getTeamYearWins,
        getTeamYearDetails: this.getTeamYearDetails
      }
    })
  }

  getTeamYearDetails = async (shortTeam, yr, yearList) => {
    const api_call = await fetch(`http://localhost:8082/api/teams/${shortTeam}/${yr}`)
    const teamYearDetails = await api_call.json()
    this.setState({
      comp: {
        compName: "TeamYearDetails",
        details: teamYearDetails,
        yr: yr,
        yearList: yearList,
        name: shortTeam,
        getTeamYearDetails: this.getTeamYearDetails,
        getTeamYearWins: this.getTeamYearWins
      }
    })
  }

  render() {
    let myComponent = ""
    if (this.state.comp.compName === "Home") {
      myComponent = <Home />
    } else if (this.state.comp.compName === "Teams") {
      myComponent = <Teams
        teams={this.state.comp.teams}
        getTeamYearWins={this.state.comp.getTeamYearWins}
      />
    } else if (this.state.comp.compName === "Wins") {
      myComponent = <Wins
        wins={this.state.comp.wins}
        shortTeamNames={this.state.shortTeamNames}
        getTeamYearDetails={this.state.comp.getTeamYearDetails}
        getTeamYearWins={this.state.comp.getTeamYearWins}
      />
    } else if (this.state.comp.compName === "TeamYearDetails") {
      myComponent = <TeamYearDetails
        details={this.state.comp.details}
        yr={this.state.comp.yr}
        yearList={this.state.comp.yearList}
        name={this.state.comp.name}
        getTeamYearDetails={this.state.comp.getTeamYearDetails}
        getTeamYearWins={this.state.comp.getTeamYearWins}
      />
    }
    return (
      <div className="app">
        <div className="sidebar" >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li onClick={this.setHome} > Home </li>
            <li onClick={this.getTeams} > Teams </li>
            <li className="nolink" onClick={this.getPlayers} > Players </li>
          </ul>
        </div>

        <div className="main">
          {myComponent}
        </div>
      </div>
    );
  }
}

export default App;
