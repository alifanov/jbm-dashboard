import React from "react";

import {FaExpandArrowsAlt} from "react-icons/fa";
import {
  Tooltip,
} from 'react-tippy';

import Widget from "../Widget";

import "./index.css";
import 'react-tippy/dist/tippy.css';


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
        <div className='zones'>
          <Tooltip
          title='Molar'
          position={'right'}
          >
            <div className='zone' style={{
              top: '60px',
              left: '295px',
            }}/>
          </Tooltip>
          <Tooltip
          title='Hair'
          position={'right'}
          >
            <div className='zone'
                 style={{
                   top: '15px',
                   left: '305px'
                 }}
            />
          </Tooltip>
        </div>
        <div style={{textAlign: 'center'}}>
          <img src='/human-body-bold.png' height={600} />
        </div>
      </div>
    );
  }
}
