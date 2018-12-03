import React from "react";

import {
  Area,
  AreaChart,
  Tooltip,
  XAxis,
  ResponsiveContainer,
  YAxis
} from "recharts";

import Widget from "../Widget";
import Cell from "../Cell";

import "./index.css";

const proxyUrl = "https://cors-anywhere.herokuapp.com/";

export default class TelegramWidget extends Widget {
  config = ["url", "apikey"];
  widgetKey = "telegram";

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
    const [currentFollowers] = data.result.slice(-1);
    this.setState({
      data: {
        currentFollowersCount: currentFollowers.followersCount,
        followers: data.result.map(r => ({
          dt: `${r._id.dayOfMonth.toString().padStart(2, "0")}.${r._id.month}`,
          value: r.followersCount
        }))
      }
    });
  }

  renderWidget() {
    return (
      <div className="row">
        <ResponsiveContainer width="100%" height={110}>
          <AreaChart data={this.state.data.followers}>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
              dot={{ stroke: "#8884d8", strokeWidth: 2, fill: "#8884d8" }}
            />
            <XAxis dataKey="dt" stroke="#eee" dy={10} />
            <YAxis tick={false} axisLine={false} />
            <Tooltip labelStyle={{ color: "#8884d8" }} />
          </AreaChart>
        </ResponsiveContainer>
        <Cell
          style={{ marginLeft: "20px" }}
          title={"Followers"}
          value={this.state.data.currentFollowersCount || 0}
        />
      </div>
    );
  }
}
