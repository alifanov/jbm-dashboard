import React from "react";

import "./index.css";

export const Cell = props => (
  <div className="cell">
    <div className="cell-title">{props.title}</div>
    <div className="cell-body">
      <div className="cell-indicator">{props.value}</div>
    </div>
  </div>
);

export default class GithubWidget extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <h2>Github</h2>
        <div className="row">
          <Cell title={"Stars"} value={10} />
          <Cell title={"Folowers"} value={20} />
          <Cell title={"Stars"} value={30} />
        </div>
      </div>
    );
  }
}
