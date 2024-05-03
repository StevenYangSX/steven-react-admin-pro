import { Component } from "react";
import { Divider } from "antd";
import { Alert, Image } from "antd";
import LifeCycleHooks from "@/components/reactKyesComponents/reactLifeCycle/LifeCycleHooks";
import lifecycleImg from "@/assets/images/react_life_cycle.png"; // Adjust the path accordingly

import BasicCounter from "@/components/reactKyesComponents/reactLifeCycle/BasicCounter";
interface CounterState {
  count: number;
  consturctorAlert: boolean;
  componentDidMountAlert: boolean;
  getDerivedStateFromPropsAlert: boolean;
}

export default class ReactLifeCycle extends Component<{}, CounterState> {
  //1. The Mounting Phase
  // --1. Call consturctor() first.
  // --2. Call getDerivedStateFromProps()
  // --3. Call render() method
  // --4. Call componentDidMount()

  //2. The Updating Phase
  // --1. Call getDerivedStateFromProps()
  // --2. Call shouldComponentUpdate()
  // --3. Call getSnapshotBeforeUpdate()
  // --4. Call componentDidUpdate()
  //3. The Unmounting Phase
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0,
      consturctorAlert: true,
      componentDidMountAlert: false,
      getDerivedStateFromPropsAlert: false,
    };
  }

  incrementCount = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  decrementCount = () => {
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }));
  };

  componentDidMount() {
    this.setState({ componentDidMountAlert: true });
  }

  static getDerivedStateFromProps(_: any, state: any) {
    return { ...state, getDerivedStateFromPropsAlert: true };
  }

  /**
   * @deprecated
   * @param nextProps
   * @param nextState
   */
  //   componentWillUpdate(nextProps: any, nextState: any) {
  //     console.log("componentWillUpdate called....", nextProps, nextState);
  //   }

  render() {
    return (
      <>
        {this.state.consturctorAlert ? (
          <Alert
            type="success"
            message="Class component constructor gets called."
            banner
            closable
          />
        ) : null}

        {this.state.getDerivedStateFromPropsAlert ? (
          <Alert type="success" message="getDerivedStateFromProps() gets called." banner closable />
        ) : null}

        {this.state.componentDidMountAlert ? (
          <Alert type="success" message="componentDidMount() gets called." banner closable />
        ) : null}
        <h2
          style={{
            margin: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            width: "500px",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          Parent Component : Ugly Counter
        </h2>
        <div
          style={{
            margin: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            width: "400px",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Image width={200} src={lifecycleImg} />
          <button onClick={this.decrementCount}>-</button>
          <span>state data : {this.state.count}</span>
          <button onClick={this.incrementCount}>+</button>
        </div>

        <Divider />
        <BasicCounter count={this.state.count} />
        <Divider />
        <LifeCycleHooks count={this.state.count} />
      </>
    );
  }
}
