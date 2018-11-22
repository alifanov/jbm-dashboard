import React from "react";

import Widget from "../Widget";
import Cell from "../Cell";

import "./index.css";

export default class YoutubeWidget extends Widget {
  config = ["channel", "token"];
  widgetKey = "youtube";

  constructor() {
    super();
    this.initConfig();
  }

  async getData() {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?id=${
        this.state.config.channel
      }%20&part=statistics&key=${this.state.config.token}`
    );
    const data = await res.json();
    this.setState({
      data: {
        views: data.items[0].statistics.viewCount,
        subscribers: data.items[0].statistics.subscriberCount,
        videos: data.items[0].statistics.videoCount
      }
    });
  }

  renderWidget() {
    return (
      <div className="row">
        <Cell title={"Views"} value={this.state.data.views || 0} />
        <Cell title={"Subscribers"} value={this.state.data.subscribers || 0} />
        <Cell title={"Videos"} value={this.state.data.videos || 0} />
      </div>
    );
  }
}
