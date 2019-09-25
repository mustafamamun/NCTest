import React, { Component } from "react";
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries,
  Hint
} from "react-vis";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { isEmpty, chain, get } from "lodash";

import LinkStationDetails from "./LinkStationDetails";
import {
  detailTextStyle,
  graphDivStyle,
  inputDivStyle,
  submitButtonStyle,
  markerHintStyle,
  givenDeviceDetailsStyle
} from "../style/style.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      modal: false,
      linkStations: [
        { x: 0, y: 0, color: "green", reach: 10, size: 2 },
        { x: 20, y: 20, color: "orange", reach: 5, size: 2 },
        { x: 10, y: 0, color: "purple", reach: 12, size: 2 }
      ],
      newDevice: {},
      devices: [
        { x: 0, y: 0, color: "red", size: 1 },
        { x: 100, y: 100, color: "maroon", size: 1 },
        { x: 15, y: 10, color: "lime", size: 1 },
        { x: 18, y: 18, color: "blue", size: 1 }
      ],
      xVal: "",
      yVal: ""
    };
    this.toggle = this.toggle.bind(this);
    this.forgetValue = this.forgetValue.bind(this);
    this.rememberValue = this.rememberValue.bind(this);
    this.findLinkStation = this.findLinkStation.bind(this);
  }

  forgetValue = () => {
    this.setState({
      value: null
    });
  };

  rememberValue = value => {
    this.setState({ value });
  };
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  findLinkStation = deviceLoc => {
    const { linkStations } = this.state;
    return chain(linkStations)
      .map(station => {
        const distanceFromLinkStation = Math.hypot(
          Math.abs(deviceLoc.x - station.x),
          Math.abs(deviceLoc.y - station.y)
        );
        return {
          ...station,
          power:
            station.reach - distanceFromLinkStation > 0
              ? Math.pow(station.reach - distanceFromLinkStation, 2)
              : 0
        };
      })
      .sortBy("power")
      .last()
      .value();
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addNewDeviceCoordinate = () => {
    const { xVal, yVal } = this.state;
    if (!xVal || !yVal || isNaN(xVal) || isNaN(yVal)) {
      alert("Please enter number for x and y value");
    } else {
      this.setState({
        modal: true,
        newDevice: { x: xVal, y: yVal, size: 1, color: "black" }
      });
    }
  };
  render() {
    const { value, newDevice, linkStations, devices, xVal, yVal } = this.state;
    const xDomain = [-30, 30],
      yDomain = [-30, 30];

    return (
      <div className="App" id="app">
        <div style={detailTextStyle}>
          Link station and device location are shown as dots in the graph. Link
          station are shown with bigger dots and devices are shown with smaller
          dots. Hover over the dots to see the exact location. The best link
          station and their power for the given devices is calculated bellow.
          Enter new device location to find best link station and power.
        </div>
        <div style={graphDivStyle}>
          <div style={inputDivStyle}>
            <b>X=</b>
            <input
              name="xVal"
              type="text"
              value={xVal}
              onChange={this.handleChange}
            />{" "}
            <b>Y=</b>
            <input
              name="yVal"
              type="text"
              value={yVal}
              onChange={this.handleChange}
            />{" "}
            <button
              style={submitButtonStyle}
              onClick={this.addNewDeviceCoordinate}
            >
              OK
            </button>
          </div>
          <FlexibleWidthXYPlot height={600} {...{ xDomain, yDomain }}>
            <VerticalGridLines tickTotal={60} />
            <HorizontalGridLines tickTotal={60} />

            <XAxis position={"middle"} tickTotal={60} />
            <YAxis position={"middle"} tickTotal={60} />
            <MarkSeries
              onValueMouseOver={this.rememberValue}
              onValueMouseOut={this.forgetValue}
              data={[...linkStations, ...devices, newDevice].filter(
                element => !isEmpty(element)
              )}
              sizeRange={[3, 8]}
              colorType="literal"
            />
            {value ? (
              <Hint value={value}>
                <div style={markerHintStyle}>
                  <b>{get(value, "reach") ? "Link Station" : "Device"}</b>&nbsp;
                  <span>
                    {value.x}, {value.y}
                  </span>
                </div>
              </Hint>
            ) : null}
          </FlexibleWidthXYPlot>
          <div style={givenDeviceDetailsStyle}>
            {devices.map((device, index) => {
              return (
                <LinkStationDetails
                  key={index}
                  linkStation={this.findLinkStation(device)}
                  device={device}
                />
              );
            })}
          </div>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Link Station</ModalHeader>
          <ModalBody>
            <LinkStationDetails
              linkStation={this.findLinkStation({
                x: this.state.xVal,
                y: this.state.yVal
              })}
              device={{ x: this.state.xVal, y: this.state.yVal }}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
