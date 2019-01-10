import React from "react";

import asana from "asana";

import moment from 'moment'
import _ from 'lodash'

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

  async getTasksByProject(p) {
    const req = await this.client.tasks.findByProject(p.id, {
      limit: 100,
      opt_fields: "completed,due_at,name"
    });
    const tasks = await req.fetch(300);
    const todayEnd = moment().endOf('day');
    const myTasks = tasks
      .filter(task => task.completed === false)
      .filter(task => task.due_at !== null)
      .map(task => ({...task, due_at: moment(task.due_at)}))
      .filter(task => task.due_at < todayEnd);
    return myTasks;
  }

  async getData() {
    const user = await this.client.users.me();
    const workspaceId = user.workspaces[0].id;
    const projects = await this.client.projects.findAll({
      workspace: workspaceId
    });
    let tasks = [];
    for(const p of projects.data){
      tasks.push(await this.getTasksByProject(p))
    }
    tasks = _.flatMap(tasks)
    const count = tasks.length;
    this.setState({data: {tasks: count}});
  }

  renderWidget() {
    return (
      <div className="row">
        <Cell title={"Tasks"} value={this.state.data.tasks || 0}/>
      </div>
    );
  }
}
