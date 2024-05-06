import React, { useRef, useEffect, useCallback } from "react";
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
  LegendComponent,
} from "echarts/components";

// Features like Universal Transition and Label Layout
import { LabelLayout, UniversalTransition } from "echarts/features";

// Import the Canvas renderer
// Note that including the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from "echarts/renderers";

const BasicGuageChart = ({ guageData }: { guageData: number }) => {
  const chartRef = useRef(null);

  const createChartInstance = useCallback(() => {
    echarts.use([
      LegendComponent,
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
      title: {
        text: "Basic Guage Chart",
        top: "top", // Position title at the middle vertically
        left: "center", // Position title at the center horizontally
      },
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
              value: 0,
              name: "SCORE",
            },
          ],
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
        ];
        chart.setOption(currentOptions);
      }
    }
  }, [guageData]);
  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default React.memo(BasicGuageChart);
