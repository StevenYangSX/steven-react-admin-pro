import { useRef, useEffect } from "react";
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";

// Import bar charts, all suffixed with Chart
import { BarChart } from "echarts/charts";
// Import the tooltip, title, rectangular coordinate system, dataset and transform components
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from "echarts/components";

// Features like Universal Transition and Label Layout
import { LabelLayout, UniversalTransition } from "echarts/features";

// Import the Canvas renderer
// Note that including the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from "echarts/renderers";

const ExampleBarChart = ({ dataSeries }: { dataSeries: Array<number> | undefined }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    let data = [112, 192, 267, 163, 241, 144, 85];
    console.log(":sdfsdfasdf", dataSeries);
    // Register the required components
    echarts.use([
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

    const options = {
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
          data: dataSeries,
        },
      ],
    };

    chart.setOption(options);

    // Clean up chart instance on unmount
    return () => {
      chart.dispose();
    };
  }, [dataSeries]);
  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default ExampleBarChart;
