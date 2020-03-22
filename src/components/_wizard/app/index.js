import React, { Component } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import Routes from "./routes"
//import './bootstrap/css/bootstrap.scss'
import "./app.css"

/**
 * Application entry point.
 * Maps provider, store, routes
 *
 * We are using browser router, if hashRouting is preferred then this is where you change.
 */
class App extends Component {
  render() {
    return (
      <div className="mrsi-wizard-site">
        <Router>
          <Routes />
        </Router>
      </div>
    )
  }
}

export default App
