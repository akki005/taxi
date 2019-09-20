

import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Ride from './components/Ride';
// import Driver from './components/Driver';
import DriversTable from './components/Drivers/DriversTable';
// import ShiftAdd from './components/ShiftAdd';
import Shifts from './components/Drivers/Shifts/Shifts';
import Cars from './components/Drivers/Cars/Cars';



class App extends Component {
  render() {
    return (
      <Router>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Book Ride</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/drivers">Drivers</Link>
                </li>
              </ul>
            </div>
          </nav>
        <Route exact path="/" component={Ride} />
        <Route exact path="/drivers" component={DriversTable} />
        <Route exact path="/drivers/:id/shifts" component={Shifts} />
        <Route exact path="/drivers/:id/cars" component={Cars} />
      </Router>
    );
  }
}

export default App;