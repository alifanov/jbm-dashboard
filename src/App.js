import React, { Component } from "react";
import "./App.css";

import GithubWidget from "./components/GithubWidget";

class App extends Component {
  render() {
    return (
      <div className="App">
        <GithubWidget />
      </div>
    );
  }
}

export default App;
