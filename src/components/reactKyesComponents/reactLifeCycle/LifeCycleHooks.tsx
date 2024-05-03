import { useState, useEffect } from "react";
import { Divider } from "antd";
import { Alert, Progress } from "antd";

interface LifeCycleHooksPropsType {
  count: number;
}
const LifeCycleHooks = ({ count }: LifeCycleHooksPropsType) => {
  const [getDerivedStateFromPropsAlert, setGetDerivedStateFromPropsAlert] =
    useState<boolean>(false);
  const [componentDidUpdateAlert, setComponentDidUpdateAlert] = useState<Boolean>(false);

  const [previousStateValue, setPreviousStateValue] = useState<number>(count);
  // If your effect returns a function, React will run it when it is time to clean up
  useEffect(() => {
    if (count % 2 !== 0) {
      setGetDerivedStateFromPropsAlert(true);
    } else {
      setGetDerivedStateFromPropsAlert(false);
    }
    return function clearnup() {
      setComponentDidUpdateAlert(true);
      setPreviousStateValue(count);
    };
  }, [count]);
  return (
    <div>
      <h3>Life cycle in hooks</h3>
      <Divider />
      {getDerivedStateFromPropsAlert ? (
        <Alert
          type="success"
          message="use useEffect() to simulate getDerivedStateFromProps() => This Alert shows when counter is odd."
          banner
          closable
        />
      ) : null}
      {componentDidUpdateAlert ? (
        <Alert
          type="success"
          message={`use useEffect() to simulate componentDidUpdate() & componentWillUnmount() => Previous props value is ${previousStateValue}`}
          banner
          closable
        />
      ) : null}
      <Progress
        style={{
          margin: "10px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          width: "300px",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
        type="circle"
        percent={count}
      />
    </div>
  );
};

export default LifeCycleHooks;
