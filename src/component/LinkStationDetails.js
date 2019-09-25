import React, { Component } from "react";

export default class LinkStationDetails extends Component {
  render() {
    const {
      linkStation: { power, x, y, color },
      device
    } = this.props;
    return power !== 0 ? (
      <div>
        Best link station for point{" "}
        <span style={{ color: device.color }}>
          {device.x}, {device.y}
        </span>{" "}
        is{" "}
        <span style={{ color: color }}>
          {x}, {y}
        </span>{" "}
        with power {power}{" "}
      </div>
    ) : (
      <div>
        No link station within reach for point{" "}
        <span style={{ color: device.color }}></span>
        {device.x}, {device.y}{" "}
        {(device.x > 30 ||
          device.x < -30 ||
          device.y > 30 ||
          device.y < -30) && <span>(device not in graph)</span>}
      </div>
    );
  }
}
