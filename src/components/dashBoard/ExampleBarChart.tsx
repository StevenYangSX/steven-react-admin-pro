import React, { useRef, useEffect, useCallback } from "react";
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";
// Import EChartOption type
import { EChartsOption } from "echarts";
// Import SeriesOption$1 type
import { RegisteredSeriesOption } from "echarts";

// Import bar charts, all suffixed with Chart
import { BarChart } from "echarts/charts";
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

const ExampleBarChart = ({ dataSeries }: { dataSeries: Array<number> | undefined }) => {
  const chartRef = useRef(null);
  // Create the chart instance using useCallback
  const createChartInstance = useCallback(() => {
    echarts.use([
      LegendComponent,
      BarChart,
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
    const options: EChartsOption = {
      title: {
        text: "Exapple Bar Chart",
        top: "top", // Position title at the middle vertically
        left: "center", // Position title at the center horizontally
      },

      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [],
        } as RegisteredSeriesOption["bar"],
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

  // Update the chart data when data prop changes
  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.getInstanceByDom(chartRef.current);
      if (chart) {
        let currentOptions = chart.getOption();
        currentOptions.series = [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data: dataSeries,
          } as RegisteredSeriesOption["bar"],
        ];
        chart.setOption(currentOptions);
      }
    }
  }, [dataSeries]);
  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default React.memo(ExampleBarChart);
