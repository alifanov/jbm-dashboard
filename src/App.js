import React, { Component } from "react";
import "./App.css";

import GithubWidget from "./components/GithubWidget";
import YoutubeWidget from "./components/YoutubeWidget";

class App extends Component {
  render() {
    return (
      <div className="App">
        <GithubWidget />
        <YoutubeWidget />
      </div>
    );
  }
}

export default App;
