import React from "react";
interface MousePositionType {
  x: number;
  y: number;
}
interface WatchSimulatorPropsType {
  mousePosition: MousePositionType;
}
const WatchSimulator = ({ mousePosition }: WatchSimulatorPropsType) => {
  return <div>WatchSimulator</div>;
};

export default WatchSimulator;
