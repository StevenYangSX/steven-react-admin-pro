import { Suspense } from "react";
import { Spin } from "antd";
const SuspenseWrap = (component: JSX.Element) => {
  return <Suspense fallback={<Spin spinning fullscreen={true} />}>{component}</Suspense>;
};
export default SuspenseWrap;
