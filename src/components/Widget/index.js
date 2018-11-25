import React from "react";

import "./index.css";

import { FaCog, FaExpandArrowsAlt } from "react-icons/fa";

import WidgetConfig from "../WidgetConfig";
export default class Widget extends React.Component {
  config = [];
  widgetKey = "-";

  initConfig() {
    const config = JSON.parse(localStorage.getItem(this.widgetKey));

    this.state = {
      config: this.config.reduce(
        (o, key) => ({ ...o, [key]: config ? config[key] : "" }),
        {}
      ),
      configMode: false,
      data: {}
    };
  }

  componentDidMount() {
    this.getData();
    // setInterval(() => this.getData(), 5000);
  }

  saveConfig(config) {
    localStorage.setItem(this.widgetKey, JSON.stringify(config));
    this.setState({ configMode: false, ...config });
    this.getData();
  }

  async getData() {}

  renderVisual() {
    return <div className="row">Widget</div>;
  }

  render() {
    return (
      <div className="wrapper">
        <span className="dragging">
          <FaExpandArrowsAlt />
        </span>
        <h2 className="widget-title">{this.widgetKey} </h2>
        <span
          className="config-btn"
          onClick={() => this.setState({ configMode: !this.state.configMode })}
        >
          <FaCog />
        </span>
        {this.state.configMode ? (
          <WidgetConfig
            onSave={result => this.saveConfig({ ...result })}
            {...this.state.config}
          />
        ) : (
          this.renderWidget()
        )}
      </div>
    );
  }
}
