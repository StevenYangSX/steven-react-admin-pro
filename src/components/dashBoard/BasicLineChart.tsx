import React, { useRef, useEffect, useCallback } from "react";
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";

// Import bar charts, all suffixed with Chart
import { LineChart } from "echarts/charts";
// Import the tooltip, title, rectangular coordinate system, dataset and transform components
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
} from "echarts/components";

// Features like Universal Transition and Label Layout
import { LabelLayout, UniversalTransition } from "echarts/features";

// Import the Canvas renderer
// Note that including the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from "echarts/renderers";

const BasicLineChart = ({ stackLineData }: { stackLineData: Array<Array<number>> }) => {
  const chartRef = useRef(null);
  // Create the chart instance using useCallback
  const createChartInstance = useCallback(() => {
    echarts.use([
      LegendComponent,
      LineChart,
      TitleComponent,
      TooltipComponent,
      GridComponent,
      DatasetComponent,
      TransformComponent,
      LabelLayout,
      UniversalTransition,
      CanvasRenderer,
    ]);
    const chart = echarts.init(chartRef.current);
    const options = {
      title: {
        text: "Exaple Stack Line Chart",
        top: "top", // Position title at the middle vertically
        left: "center", // Position title at the center horizontally
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["Video Ads", "Direct", "Search Engine"],
        top: "bottom", // Position legend at the bottom
        left: "center", // Align legend to the center horizontally
      },
      grid: {
        top: 40, // Adjust top padding to make space for title
        left: 60,
        right: 60,
        bottom: 80, // Adjust bottom padding to make space for legend
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Video Ads",
          type: "line",
          stack: "Total",
          data: [],
        },
        {
          name: "Direct",
          type: "line",
          stack: "Total",
          data: [],
        },
        {
          name: "Search Engine",
          type: "line",
          stack: "Total",
          data: [],
        },
      ],
    };
    chart.setOption(options);
    return chart;
  }, []); // Empty depende

  useEffect(() => {
    const chart = createChartInstance();
    // Clean up chart instance on unmount
    return () => {
      chart.dispose();
    };
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.getInstanceByDom(chartRef.current);
      if (chart) {
        let currentOptions = chart.getOption();
        currentOptions.series = [
          {
            name: "Video Ads",
            type: "line",
            stack: "Total",
            data: stackLineData[0],
          },
          {
            name: "Direct",
            type: "line",
            stack: "Total",
            data: stackLineData[1],
          },
          {
            name: "Search Engine",
            type: "line",
            stack: "Total",
            data: stackLineData[2],
          },
        ];
        (currentOptions.legend = {
          data: ["Video Ads", "Direct", "Search Engine"],
          top: "bottom", // Position legend at the bottom
          left: "center", // Align legend to the center horizontally
        }),
          chart.setOption(currentOptions);
      }
    }
  }, [stackLineData]);
  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default React.memo(BasicLineChart);
