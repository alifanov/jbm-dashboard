import React from "react";

import Widget from "../Widget";
import Cell from "../Cell";

import "./index.css";

export default class GithubWidget extends Widget {
  config = ["username", "token"];
  widgetKey = "github";

  constructor() {
    super();
    this.initConfig();
  }

  async getData() {
    const res = await fetch("https://api.github.com/graphql", {
      headers: { Authorization: `bearer ${this.state.config.token}` },
      method: "POST",
      body:
        '{"query": "query {viewer { followers {totalCount}, repositories(isFork: false, first: 100) { totalCount, edges { node { stargazers {totalCount}, name}} }}}"}'
    });
    const data = await res.json();
    this.setState({
      data: {
        followers: data.data.viewer.followers.totalCount,
        repositories: data.data.viewer.repositories.totalCount,
        starredRepositories: data.data.viewer.repositories.edges
          .map(e => e.node.stargazers.totalCount)
          .reduce((a, b) => a + b, 0)
      }
    });
  }

  renderWidget() {
    return (
      <div className="row">
        <Cell title={"Repos"} value={this.state.data.repositories || 0} />
        <Cell title={"Folowers"} value={this.state.data.followers || 0} />
        <Cell
          title={"Stars"}
          value={this.state.data.starredRepositories || 0}
        />
      </div>
    );
  }
}
