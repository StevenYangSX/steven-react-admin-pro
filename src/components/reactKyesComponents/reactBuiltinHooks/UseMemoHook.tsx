import Map from "@/components/map/Map";
import { Divider } from "antd";
import React from "react";

const UseMemoHook = () => {
  return (
    <>
      <h4>
        <code>useMemo</code> lets you cache the result of a calculation between re-renders.
      </h4>
      <p>
        This heatmap's data ues useMemo to cache the fitlered data. Also, The control panel uses{" "}
        <code>React.memo()</code> to stop re-render when props changes.
      </p>
      <Divider />
      <Map />
    </>
  );
};

export default UseMemoHook;
