import React from "react";

import Widget from "../Widget";
import Cell from "../Cell";

import "./index.css";

const proxyUrl = "https://cors-anywhere.herokuapp.com/";

export default class MediumWidget extends Widget {
  config = ["account"];
  widgetKey = "medium";

  constructor() {
    super();
    this.initConfig();
  }

  async getData() {
    const res = await fetch(
      proxyUrl + "https://medium.com/@jetbootsmaker/followers",
      {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
    const data = await res.text();
    console.log("Medium:");
    const doc = new DOMParser().parseFromString(data, "text/html");
    [...doc.querySelectorAll("script")].forEach(el => {
      const matched = /"usersFollowedByCount":(\d+),/.exec(el.innerHTML);
      if (matched) {
        this.setState({
          data: {
            followers: parseInt(matched[1])
          }
        });
      }
    });
  }

  renderWidget() {
    return (
      <div className="row">
        <Cell title={"Follower"} value={this.state.data.followers || 0} />
      </div>
    );
  }
}
