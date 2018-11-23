import React from "react";

import Widget from "../Widget";
import Cell from "../Cell";

import "./index.css";

export default class TelegramWidget extends Widget {
  config = ["token"];
  widgetKey = "telegram";

  constructor() {
    super();
    this.initConfig();
  }

  async getData() {}

  renderWidget() {
    return (
      <div className="row">
        <Cell title={"Followers"} value={this.state.data.followers || 0} />
      </div>
    );
  }
}
