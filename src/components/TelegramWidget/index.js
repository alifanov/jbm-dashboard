import React from "react";

import Widget from "../Widget";
import Cell from "../Cell";

import "./index.css";

const proxyUrl = "https://cors-anywhere.herokuapp.com/";

export default class TelegramWidget extends Widget {
  config = ["url"];
  widgetKey = "telegram";

  constructor() {
    super();
    this.initConfig();
  }

  async getData() {
    const res = await fetch(proxyUrl + this.state.config.url);
    const data = await res.json();
    this.setState({
      data: {
        followers: data.followers
      }
    });
  }

  renderWidget() {
    return (
      <div className="row">
        <Cell title={"Followers"} value={this.state.data.followers || 0} />
      </div>
    );
  }
}
