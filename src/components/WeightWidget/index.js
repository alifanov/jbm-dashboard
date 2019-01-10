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

export default class WeightWidget extends Widget {
  config = ["url", "apikey"];
  widgetKey = "weight";

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
    const [currentValue] = data.result.slice(-1);
    this.setState({
      data: {
        currentWeight: parseFloat(currentValue.weight),
        weightRecords: data.result.map(r => ({
          dt: `${r._id.dayOfMonth.toString().padStart(2, "0")}.${r._id.month}`,
          value: parseFloat(r.weight)
        }))
      }
    });
  }

  renderWidget() {
    return (
      <div className="row">
        <ResponsiveContainer width="100%" height={90}>
          <AreaChart data={this.state.data.weightRecords}>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#6567d8"
              fill="#8884d8"
              dot={{ stroke: "#6567d8", strokeWidth: 2, fill: "#6567d8" }}
            />
            <XAxis hide={true} dataKey="dt" stroke="#eee" dy={10} />
            <YAxis tick={false} axisLine={false} />
            <Tooltip labelStyle={{ color: "#8884d8" }} />
          </AreaChart>
        </ResponsiveContainer>
        <Cell
          style={{ marginLeft: "20px" }}
          title={"Kilos"}
          value={(this.state.data.currentWeight || 0).toFixed(1)}
        />
      </div>
    );
  }
}
