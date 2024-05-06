import React, { useRef, useEffect, useCallback } from "react";
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";

// Import bar charts, all suffixed with Chart
import { PieChart } from "echarts/charts";
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

const BasicRadarChart = ({ radarData }: { radarData: Array<Array<number>> }) => {
  const chartRef = useRef(null);
  const createChartInstance = useCallback(() => {
    echarts.use([
      LegendComponent,
      PieChart,
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
        text: "Example Pie Chart",
        top: "top", // Position title at the middle vertically
        left: "center", // Position title at the center horizontally
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        left: "left",
        orient: "horizontal", // Display legend items horizontally
        bottom: 10, // Position the legend at the bottom with 10px padding
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "40%",
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
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
            name: "Access From",
            type: "pie",
            radius: "40%",
            data: [
              { value: radarData[0][0], name: "Search Engine" },
              { value: radarData[0][1], name: "Direct" },
              { value: radarData[0][2], name: "Email" },
              { value: radarData[0][3], name: "Union Ads" },
              { value: radarData[0][4], name: "Video Ads" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ];

        chart.setOption(currentOptions);
      }
    }
  }, [radarData]);
  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default React.memo(BasicRadarChart);
