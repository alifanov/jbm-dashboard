import React from "react";

import Cell from "../Cell";

import "./index.css";

class WidgetConfig extends React.Component {
  state = {
    username: this.props.username,
    token: this.props.token
  };
  render() {
    return (
      <div>
        <div className="cell-config-field">
          <input
            type="text"
            placeholder="username"
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
          />
        </div>
        <div className="cell-config-field">
          <input
            type="text"
            placeholder="token"
            value={this.state.token}
            onChange={e => this.setState({ token: e.target.value })}
          />
        </div>
        <div className="cell-config-field">
          <button onClick={() => this.props.onSave({ ...this.state })}>
            Save
          </button>
        </div>
      </div>
    );
  }
}
export default class GithubWidget extends React.Component {
  constructor(props) {
    super(props);
    const config = JSON.parse(localStorage.getItem("github"));
    this.state = {
      config: {
        username: config ? config.username : "",
        token: config ? config.token : ""
      },
      configMode: false,
      data: {}
    };
  }

  componentDidMount() {
    this.getData();
  }

  saveConfig(config) {
    localStorage.setItem("github", JSON.stringify(config));
    const { username, token } = config;
    this.setState({ username, token, configMode: false });
  }

  async getData() {
    const res = await fetch("https://api.github.com/graphql", {
      headers: { Authorization: `bearer ${this.state.config.token}` },
      method: "POST",
      body:
        '{"query": "query {viewer { followers {totalCount}, starredRepositories { totalCount }, repositories { totalCount }}}"}'
    });
    const data = await res.json();
    this.setState({
      data: {
        followers: data.data.viewer.followers.totalCount,
        repositories: data.data.viewer.repositories.totalCount,
        starredRepositories: data.data.viewer.starredRepositories.totalCount
      }
    });
  }

  render() {
    return (
      <div className="wrapper">
        <h2>
          Github{" "}
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
          <div className="row">
            <Cell title={"Repos"} value={this.state.data.repositories || 0} />
            <Cell title={"Folowers"} value={this.state.data.followers || 0} />
            <Cell
              title={"Stars"}
              value={this.state.data.starredRepositories || 0}
            />
          </div>
        )}
      </div>
    );
  }
}
