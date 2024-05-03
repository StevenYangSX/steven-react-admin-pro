import { Divider, Tag, Alert } from "antd";
import { useState, useEffect } from "react";
import { serverHealthCheckApi } from "@/api/apiTest";
import WatchSimulator from "./components/WatchSimulator";

const customDescription = (
  <div>
    <ul>
      <li>Effects don’t run on the server</li>
      <li>Fetching directly in Effects makes it easy to create “network waterfalls”</li>
      <li>Fetching directly in Effects usually means you don’t preload or cache data</li>
      <li>It’s not very ergonomic</li>
    </ul>
    <Alert
      type="success"
      message="React Query, useSWR, and React Router 6.4+ can solve this problem!"
    />
  </div>
);
const UseEffectHook = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [serverStatus, setServerStatus] = useState<boolean>(false);
  useEffect(() => {
    function handleMove(e: { clientX: any; clientY: any }) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("pointermove", handleMove);
    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, []);

  useEffect(() => {
    serverHealthCheckApi()
      .then((res) => {
        setServerStatus(res.message === "Success" ? true : false);
      })
      .catch((_error) => {
        setServerStatus(false);
      });
  }, []);
  return (
    <>
      <h4>
        1. Connecting to an external system : The pink shallow moveing with mouse is implemented
        using useEffect()
      </h4>
      <p>We use browser DOM window ojbect. So we need to use useEffect() </p>
      <div
        style={{
          position: "absolute",
          backgroundColor: "pink",
          borderRadius: "50%",
          opacity: 0.6,
          transform: `translate(${position.x}px, ${position.y}px)`,
          pointerEvents: "none",
          left: -20,
          top: -20,
          width: 40,
          height: 40,
        }}
      />
      <Divider />
      <h4>2. Fetch data in useEffect() : The server_status data is fetched in useEffech().</h4>
      <p>
        server_status : {"  "}
        {serverStatus === true ? (
          <Tag color="success">Running</Tag>
        ) : (
          <Tag color="error">Down</Tag>
        )}{" "}
      </p>
      <Alert
        style={{ marginTop: "14px" }}
        message="Fetching data in useEffect has significant downsides"
        description={customDescription}
        type="info"
        closable
      />

      <Divider />
      <h4>3. "Watch" reactive data : Use useEffect() to "watch" form data</h4>
      <WatchSimulator />
    </>
  );
};

export default UseEffectHook;
