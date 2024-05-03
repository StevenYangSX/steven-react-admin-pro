import Map from "@/components/map/Map";
import { Divider } from "antd";
const UseMemoHook = () => {
  return (
    <>
      <h4>
        <code>useMemo</code> lets you cache the result of a calculation between re-renders.
      </h4>
      <p>
        This heatmap's data ues <code>useMemo</code> to cache the fitlered data. Also, The control
        panel uses <code>React.memo()</code> to skip re-rendering when its props are unchanged.
      </p>
      <Divider />

      <Map />
    </>
  );
};

export default UseMemoHook;
