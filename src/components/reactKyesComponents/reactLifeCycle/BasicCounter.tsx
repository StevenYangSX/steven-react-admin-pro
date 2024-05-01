import { Component } from "react";
import { Alert } from "antd";
interface BasicCounterPropType {
  count: number;
  getDerivedStateFromPropsAlert?: false;
}
interface BasicCounterStateType {
  test: string;
  getDerivedStateFromPropsAlert?: boolean;
  shouldComponentUpdateAlert?: boolean;
  alertType?: AlertType;
}

type AlertType = "success" | "error" | "warning" | "info" | undefined;
import { Progress } from "antd";

export default class BasicCounter extends Component<BasicCounterPropType, BasicCounterStateType> {
  constructor(props: BasicCounterPropType) {
    super(props);
    this.state = {
      test: "test",
    };
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    console.log("shouldComponentUpdate called....", nextProps, nextState);
    return true;
    // return false;
  }
  getRandomString() {
    const options = ["success", "error", "warning", "info"];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex] as AlertType;
  }
  static getDerivedStateFromProps(props: any, state: any) {
    if (props.count % 2 !== 0) {
      return { ...state, getDerivedStateFromPropsAlert: true };
    }
    return { ...state, getDerivedStateFromPropsAlert: false };
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    console.log("componentDidUpdate called....", prevProps, prevState);

    if (prevState.getDerivedStateFromPropsAlert) {
      this.setState({ shouldComponentUpdateAlert: true });
      this.setState({ alertType: this.getRandomString() });
    }
    // this.setState({ shouldComponentUpdateAlert: true });
    // this.setState({ alertType: this.getRandomString() });
  }

  getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
    console.log("getSnapshotBeforeUpdate called....", prevProps, prevState);

    return null;
  }

  componentWillUnmount() {
    console.log("componentWillUnmount called....");
  }

  render() {
    let percent = this.props.count;
    return (
      <>
        {this.state.getDerivedStateFromPropsAlert ? (
          <Alert
            type="success"
            message="getDerivedStateFromProps() gets called => This Alert shows when counter is odd."
            banner
            closable
          />
        ) : null}

        {this.state.shouldComponentUpdateAlert ? (
          <Alert
            type={this.state.alertType}
            message="componentDidUpdate() gets called => This Alert shows when getDerivedStateFromPropsAlert shows and then comnponent updated."
            banner
            closable
          />
        ) : null}
        <h2
          style={{
            margin: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            width: "300px",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          props data : {percent}
        </h2>
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
          percent={percent}
        />
      </>
    );
  }
}
