import React from "react";

import "./index.css";

export default props => (
  <div className="cell">
    <div className="cell-title">{props.title}</div>
    <div className="cell-body">
      <div className="cell-indicator">{props.value}</div>
    </div>
  </div>
);
