import React from "react";

import Timeline from 'react-time-line';
import {FaExpandArrowsAlt} from "react-icons/fa";

import Widget from "../Widget";

import "./index.css";

const proxyUrl = "https://cors-anywhere.herokuapp.com/";

export default class TimelineWidget extends Widget {
  config = ['apikey', 'url'];
  widgetKey = "timeline";

  constructor() {
    super();
    this.initConfig();
  }

  async getData() {
    const res = await fetch(proxyUrl + this.state.config.url, {
      headers: {
        "x-api-key": this.state.config.apikey
      }
    });
    const data = await res.json();
    this.setState({
      data: {
        tasks: data.result.map(task => ({
          ts: task.dueAt,
          text: `${task.completed ? '[x]' : ''} ${task.name}`
        }))
      }
    });
  }

  render() {
    return (
      <div className="timeline">
        <span className="dragging">
          <FaExpandArrowsAlt />
        </span>
        <Timeline items={this.state.data.tasks || []}/>
      </div>
    );
  }
}
