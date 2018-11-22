import React from "react";

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
        <h2>
          {this.widgetKey}{" "}
          <span
            onClick={() =>
              this.setState({ configMode: !this.state.configMode })
            }
          >
            edit
          </span>
        </h2>
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
