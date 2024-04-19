import { ForwardedRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from "chart.js";
import Zoom from "chartjs-plugin-zoom";
import styles from "./VerticalBar.module.scss";
import { ViolentData } from "@/components/pages/Violent/ViolentMain";
import { policeChartColor } from "@/utils/openapi/police/police";
import dynamic from "next/dynamic";
import { Button, ButtonGroup, Grid } from "@mui/material";
import { Chart } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {
  className?: string;
  dataObject: ViolentData[];
  chartName?: string;
  colors?: string[];
  labels: string[];
  zoomNeed?: boolean;
};

export const VerticalBar: React.FC<Props> = ({ labels, dataObject, chartName, className, colors, zoomNeed = true }) => {
  /**
   * Zoom library 는 register 시 서버 측 렌더링 되므로 window is not defined 에러 발생 => 로딩 이후 시점으로 초기화
   * next/dynamic 으로 이용 가능하나, Zoom 내부 함수 사용 불가능 ((ex) resetZoom )
   *  => Type이 달라지므로 useRef 를 통해서 불러오지 못함
   *
   */
  useEffect(() => {
    if (zoomNeed) {
      (async () => {
        const zoom = (await import("chartjs-plugin-zoom")).default;
        ChartJS.register(zoom);
      })();
    }
  }, []);

  const chartRef = useRef<ChartJS | null>(null);
  const chartDatas: ViolentData[] = dataObject;

  const defaultColor = useMemo(() => {
    if (colors && colors.length === labels.length) {
      return colors;
    }
    return ["#FFC0CB", "#FFDAB9", "#E6E6FA", "#B0E0E6", "#F0E68C", "#F5FFFA", "#FFFACD", "#77DD77", "#89CFF0", "#FDFD96", "#F4C2C2", "#CA9BF7", "#A0D8EF", "#F498AD", "#87CEEB", "#A7DBA8", "#E6A4B4", "#FFB347"];
  }, [colors, labels]);

  const data = {
    labels,
    datasets: chartDatas.map((item, index) => {
      const label = item.label;
      return {
        ...item,
        backgroundColor: policeChartColor[label] ?? defaultColor[index],
        borderColor: policeChartColor[label] ?? defaultColor[index],
      };
    }),
  };

  const handleResetZoom = useCallback(() => {
    if (chartRef && chartRef.current) {
      chartRef.current.resetZoom();
    }
  }, [chartRef.current]);

  return (
    <div className={className}>
      {chartName && <div className={styles.chartName}>{chartName}</div>}
      <Chart
        ref={chartRef}
        data={data}
        type="line"
        options={{
          plugins: {
            zoom: {
              pan: {
                enabled: true,
                mode: "xy",
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: "xy",
              },
            },
          },
        }}
      />
      {zoomNeed && (
        <>
          <Grid container>
            <Grid item className={styles.buttonGroup}>
              <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button
                  onClick={() => {
                    if (chartRef && chartRef.current) {
                      chartRef.current.zoom(1.1);
                    }
                  }}
                >
                  Zoom +10%
                </Button>
                <Button
                  onClick={() => {
                    if (chartRef && chartRef.current) {
                      chartRef.current.zoom(0.9);
                    }
                  }}
                >
                  Zoom -10%
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item className={styles.resetButton}>
              <Button variant="outlined" onClick={handleResetZoom}>
                초기화
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

VerticalBar.displayName = "VerticalBar";
