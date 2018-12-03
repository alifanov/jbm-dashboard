import React from "react";

import "./index.css";

export default props => (
  <div className="cell" style={props.style}>
    <div className="cell-title">{props.title.toLowerCase()}</div>
    <div className="cell-body">
      <div className="cell-indicator">{props.value}</div>
    </div>
  </div>
);
