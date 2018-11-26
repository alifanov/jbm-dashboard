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

  async getScores() {
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
    return {
      public: data[0].publicScore,
      private: data[0].privateScore
    };
  }

  async getTopScore() {
    const res = await fetch(
      proxyUrl +
        "https://www.kaggle.com/api/v1/competitions/" +
        this.state.config.competition +
        "/leaderboard/view",
      {
        headers: {
          Authorization:
            "Basic " +
            btoa(this.state.config.username + ":" + this.state.config.token)
        }
      }
    );
    const data = await res.json();
    return {
      top: data.submissions[0].score
    };
  }

  async getData() {
    const userScores = await this.getScores();
    const topScores = await this.getTopScore();
    this.setState({
      data: { ...userScores, ...topScores }
    });
  }

  renderWidget() {
    return (
      <div className="row">
        <Cell title={"Public"} value={this.state.data.public || "-"} />
        <Cell title={"Top"} value={this.state.data.top || "-"} />
        <Cell title={"Private"} value={this.state.data.private || "-"} />
      </div>
    );
  }
}
