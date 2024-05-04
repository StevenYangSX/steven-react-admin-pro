import { useRef, useEffect } from "react";
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";

// Import bar charts, all suffixed with Chart
import { RadarChart } from "echarts/charts";
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

const BasicRadarChart = () => {
  const chartRef = useRef(null);
  useEffect(() => {
    // Register the required components
    echarts.use([
      RadarChart,
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
        text: "Basic Radar Chart",
      },
      legend: {
        data: ["Allocated Budget", "Actual Spending"],
      },
      radar: {
        shape: "circle",
        indicator: [
          { name: "Sales", max: 6500 },
          { name: "Administration", max: 16000 },
          { name: "Information Technology", max: 30000 },
          { name: "Customer Support", max: 38000 },
          { name: "Development", max: 52000 },
          { name: "Marketing", max: 25000 },
        ],
      },
      series: [
        {
          name: "Budget vs spending",
          type: "radar",
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: "Allocated Budget",
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: "Actual Spending",
            },
          ],
        },
      ],
    };

    chart.setOption(options);

    // Clean up chart instance on unmount
    return () => {
      chart.dispose();
    };
  }, []);
  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default BasicRadarChart;
