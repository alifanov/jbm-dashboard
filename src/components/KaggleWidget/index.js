import React from "react";

import Widget from "../Widget";
import Cell from "../Cell";

import "./index.css";
const proxyUrl = "https://cors-anywhere.herokuapp.com/";

export default class KaggleWidget extends Widget {
  config = ["competition", "username", "token"];
  widgetKey = "kaggle";

  constructor() {
    super();
    this.initConfig();
  }

  async getData() {
    const res = await fetch(
      proxyUrl +
        "https://www.kaggle.com/api/v1/competitions/submissions/list/" +
        this.state.config.competition,
      {
        headers: {
          Authorization:
            "Basic " +
            btoa(this.state.config.username + ":" + this.state.config.token)
        }
      }
    );
    const data = await res.json();
    this.setState({
      data: {
        public: data[0].publicScore,
        private: data[0].privateScore
      }
    });
  }

  renderWidget() {
    return (
      <div className="row">
        <Cell title={"Public"} value={this.state.data.public || 0} />
        <Cell title={"Private"} value={this.state.data.private || 0} />
      </div>
    );
  }
}
