import BasicGuageChart from "@/components/dashBoard/BasicGuageChart";
import BasicLineChart from "@/components/dashBoard/BasicLineChart";
import BasicRadarChart from "@/components/dashBoard/BasicRadarChart";
import ExampleBarChart from "@/components/dashBoard/ExampleBarChart";
import { Divider, Row, Col, Button, message } from "antd";
import { useEffect, useState, useRef } from "react";
import UserTable from "@/components/dashBoard/UserTable";
import Setting from "@/setting";
const style: React.CSSProperties = {
  height: "250px",
  minWidth: "300px",
};
const DashBoard = () => {
  const [_messageApi, messageContext] = message.useMessage();
  const [span, setSpan] = useState(6);
  const [barData, setBarData] = useState([15, 25, 55, 232, 123, 19, 180]);
  const [guageData, setGuageData] = useState(50);
  const componentRef = useRef<HTMLDivElement>(null);
  const [syncStatus, setSyncStatus] = useState(false);
  const [stackLineData, setStackLineData] = useState([
    [240, 120, 190, 432, 720, 580, 1200],
    [1200, 1400, 880, 230, 580, 1000, 2300],
    [921, 231, 543, 456, 1234, 2349, 213],
  ]);
  const [radarData, setRadarData] = useState([[16000, 14000, 18000, 6800, 9999]]);

  useEffect(() => {
    const updateWidth = () => {
      if (componentRef.current) {
        const { width } = componentRef.current.getBoundingClientRect();
        let spanNumber = Math.floor(width / 330);
        if (spanNumber > 4) {
          setSpan(6);
        } else if (spanNumber <= 4 && spanNumber > 0) {
          setSpan(24 / spanNumber);
        } else {
          setSpan(24);
        }
      }
    };
    // Call updateWidth initially and on resize
    updateWidth();
    window.addEventListener("resize", updateWidth);
    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", updateWidth);
  }, []); // Empty dependency array to run effect only once on mount

  useEffect(() => {
    var sseDataEvent: EventSource | undefined;
    // sseStatusEvent = new EventSource(`${Setting.apiBaseURL}sse/status`);
    // sseStatusEvent.onmessage = (event) => {
    //   if (event.data === "true" && !syncStatus) {
    //     setSyncStatus(true);
    //   }
    //   if (event.data === "false" && syncStatus) {
    //     setSyncStatus(false);
    //   }
    // };
    if (syncStatus) {
      sseDataEvent = new EventSource(`${Setting.apiBaseURL}sse/test`);
      sseDataEvent.onmessage = (event) => {
        let sseDataParsed = JSON.parse(event.data);
        setBarData(sseDataParsed.barchartData);
        setGuageData(sseDataParsed.guage);
        setStackLineData(sseDataParsed.stackLineData);
        setRadarData(sseDataParsed.radarData);
      };
    } else {
      sseDataEvent?.close();
    }
    return () => {
      // sseStatusEvent?.close();
      sseDataEvent?.close();
    };
  }, [syncStatus]);

  const changeSyncStatus = () => {
    // updateSseStatus(syncStatus ? "false" : "true")
    //   .then((res) => {
    //     messageApi.success("Data sync is Switched " + res.message);
    //   })
    //   .catch((_err) => {
    //     messageApi.error("Server has error on data sync status");
    //   });
    setSyncStatus(!syncStatus);
  };

  return (
    <>
      <div ref={componentRef}>
        {messageContext}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
          <h4>Fake Marketing Dashborad : Implemented by SSE to make it dynamic</h4>
          {syncStatus ? (
            <Button onClick={changeSyncStatus}>Terminate Sync</Button>
          ) : (
            <Button onClick={changeSyncStatus}>Start Sync</Button>
          )}
        </div>

        <Divider />
        <Row gutter={[24, 24]}>
          <Col span={span} style={style}>
            <ExampleBarChart dataSeries={barData} />
          </Col>
          <Col span={span} style={style}>
            <BasicLineChart stackLineData={stackLineData} />
          </Col>
          <Col span={span} style={style}>
            <BasicRadarChart radarData={radarData} />
          </Col>
          <Col span={span} style={style}>
            <BasicGuageChart guageData={guageData} />
          </Col>
        </Row>
        <Divider />
        <UserTable />
      </div>
    </>
  );
};

export default DashBoard;
