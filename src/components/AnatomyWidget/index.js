import React from "react";

import {FaExpandArrowsAlt} from "react-icons/fa";

import Widget from "../Widget";

import "./index.css";

const proxyUrl = "https://cors-anywhere.herokuapp.com/";

export default class AnatomyWidget extends Widget {
  config = ['apikey', 'url'];
  widgetKey = "anatomy";

  constructor() {
    super();
    this.initConfig();
  }

  async getData() {
    this.setState({
      data: {
        points: []
      }
    });
  }

  render() {
    return (
      <div className="anatomy">
        <span className="dragging">
          <FaExpandArrowsAlt />
        </span>
        <div style={{textAlign: 'center'}}>
          <img src='/human-body.png' height={600} />
        </div>
      </div>
    );
  }
}
