import { useRef, useEffect } from "react";
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";

// Import bar charts, all suffixed with Chart
import { GaugeChart } from "echarts/charts";
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

const BasicGuageChart = ({ guageData }: { guageData: number }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    // Register the required components
    echarts.use([
      GaugeChart,
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
        formatter: "{a} <br/>{b} : {c}%",
      },
      series: [
        {
          name: "Pressure",
          type: "gauge",
          progress: {
            show: true,
          },
          detail: {
            valueAnimation: true,
            formatter: "{value}",
          },
          data: [
            {
              value: guageData,
              name: "SCORE",
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
  }, [guageData]);
  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default BasicGuageChart;
