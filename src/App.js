import React, { Component } from "react";

import GridLayout, { WidthProvider } from "react-grid-layout";

import "./App.css";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import GithubWidget from "./components/GithubWidget";
import YoutubeWidget from "./components/YoutubeWidget";
import TelegramWidget from "./components/TelegramWidget";
import AsanaWidget from "./components/AsanaWidget";
import MediumWidget from "./components/MediumWidget";
import KaggleWidget from "./components/KaggleWidget";

const WidthGridLayout = WidthProvider(GridLayout);

class App extends Component {
  state = {};

  componentDidMount() {
    const layout = localStorage.getItem("layout");
    if (layout !== null) {
      this.setState({ layout: JSON.parse(layout) });
    } else {
      this.setState({
        layout: [
          { i: "github", x: 0, y: 0, w: 1, h: 1 },
          { i: "youtube", x: 1, y: 0, w: 1, h: 1 },
          { i: "telegram", x: 2, y: 0, w: 1, h: 1 },
          { i: "asana", x: 0, y: 1, w: 1, h: 1 },
          { i: "medium", x: 1, y: 1, w: 1, h: 1 },
          { i: "kaggle", x: 2, y: 1, w: 1, h: 1 }
        ]
      });
    }
  }

  saveLayout(layout) {
    localStorage.setItem("layout", JSON.stringify(layout));
    this.setState({ layout });
  }
  render() {
    return (
      <div className="App">
        <WidthGridLayout
          className="layout"
          cols={3}
          rowHeight={235}
          isResizable={false}
          layout={this.state.layout}
          onDragStop={layout => this.saveLayout(layout)}
          draggableHandle=".dragging"
        >
          <div key="github">
            <GithubWidget />
          </div>
          <div key="youtube">
            <YoutubeWidget />
          </div>
          <div key="telegram">
            <TelegramWidget />
          </div>
          <div key="asana">
            <AsanaWidget />
          </div>
          <div key="medium">
            <MediumWidget />
          </div>
          <div key="kaggle">
            <KaggleWidget />
          </div>
        </WidthGridLayout>
      </div>
    );
  }
}

export default App;
