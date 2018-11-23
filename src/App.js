import React, { Component } from "react";
import "./App.css";

import GithubWidget from "./components/GithubWidget";
import YoutubeWidget from "./components/YoutubeWidget";
import TelegramWidget from "./components/TelegramWidget";
import AsanaWidget from "./components/AsanaWidget";

class App extends Component {
  render() {
    return (
      <div className="App">
        <GithubWidget />
        <YoutubeWidget />
        <TelegramWidget />
        <AsanaWidget />
      </div>
    );
  }
}

export default App;
