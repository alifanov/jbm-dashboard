import React from "react";

import asana from "asana";

import Widget from "../Widget";
import Cell from "../Cell";

import "./index.css";

export default class AsanaWidget extends Widget {
  config = ["token"];
  widgetKey = "asana";

  constructor() {
    super();
    this.initConfig();
    this.client = asana.Client.create().useAccessToken(this.state.config.token);
  }

  async getData() {
    const user = await this.client.users.me();
    const userId = user.id;
    const workspaceId = user.workspaces[0].id;
    const res = await this.client.tasks.findAll({
      limit: 100,
      assignee: userId,
      workspace: workspaceId,
      opt_fields: "id,completed"
    });
    const tasks = await res.data;
    const count = tasks.filter(task => task.completed === false).length;
    this.setState({ data: { tasks: count } });
  }

  renderWidget() {
    return (
      <div className="row">
        <Cell title={"Tasks"} value={this.state.data.tasks || 0} />
      </div>
    );
  }
}
