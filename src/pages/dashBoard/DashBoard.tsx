import BasicGuageChart from "@/components/dashBoard/BasicGuageChart";
import BasicLineChart from "@/components/dashBoard/BasicLineChart";
import BasicRadarChart from "@/components/dashBoard/BasicRadarChart";
import ExampleBarChart from "@/components/dashBoard/ExampleBarChart";
import { Divider, Row, Col, Button, message } from "antd";
import { useEffect, useState, useRef } from "react";
import { updateSseStatus } from "@/api/sseStatus";
const style: React.CSSProperties = {
  height: "250px",
  minWidth: "300px",
};
const DashBoard = () => {
  const [messageApi, messageContext] = message.useMessage();
  const [span, setSpan] = useState(6);
  const [barData, setBarData] = useState([15, 25, 55, 232, 123, 19]);
  const [guageData, setGuageData] = useState(50);
  const componentRef = useRef<HTMLDivElement>(null);
  const [syncStatus, setSyncStatus] = useState(false);
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
    var sseStatusEvent: EventSource | undefined;
    var sseDataEvent: EventSource | undefined;
    sseStatusEvent = new EventSource("http://localhost:8000/sse/status");
    sseStatusEvent.onmessage = (event) => {
      if (event.data === "true" && !syncStatus) {
        setSyncStatus(true);
      }
      if (event.data === "false" && syncStatus) {
        setSyncStatus(false);
      }
    };
    if (syncStatus) {
      sseDataEvent = new EventSource("http://localhost:8000/sse/test");
      sseDataEvent.onmessage = (event) => {
        let sseDataParsed = JSON.parse(event.data);
        console.log(sseDataParsed);
        setBarData(sseDataParsed.barchartData);
        setGuageData(sseDataParsed.guage);
      };
    } else {
      sseDataEvent?.close();
    }
    return () => {
      sseStatusEvent?.close();
      sseDataEvent?.close();
    };
  }, [syncStatus]);

  const changeSyncStatus = () => {
    updateSseStatus(syncStatus ? "false" : "true")
      .then((res) => {
        messageApi.success("Data sync is Switched " + res.message);
      })
      .catch((_err) => {
        messageApi.error("Server has error on data sync status");
      });
  };

  return (
    <>
      <div ref={componentRef}>
        {messageContext}
        <h4>Fake Marketing Dashborad</h4>
        {syncStatus ? (
          <Button onClick={changeSyncStatus}>Terminate Sync</Button>
        ) : (
          <Button onClick={changeSyncStatus}>Start Sync</Button>
        )}
        <Divider />
        <Row gutter={[24, 24]}>
          <Col span={span} style={style}>
            <ExampleBarChart dataSeries={barData} />
          </Col>
          <Col span={span} style={style}>
            <BasicLineChart />
          </Col>
          <Col span={span} style={style}>
            <BasicRadarChart />
          </Col>
          <Col span={span} style={style}>
            <BasicGuageChart guageData={guageData} />
          </Col>
        </Row>
        <Divider />
      </div>
    </>
  );
};

export default DashBoard;
