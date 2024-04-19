import { isObject } from "@/utils/object";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from "chart.js";
import { useMemo } from "react";
import { Chart } from "react-chartjs-2";
import styles from "./Doughnut.module.scss";
import { digit } from "@/utils/number";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

export type DoughnutData = {
  [key: string]: number;
};

type Props = {
  className?: string;
  data: DoughnutData;
  chartName?: string;
  labels?: string[];
  title: string;
  colors?: string[];
};

export const Doughnut: React.FC<Props> = ({ className, title, chartName, data, labels, colors }) => {
  if (!isObject(data)) return null;

  const chartDatas: number[] = Object.values(data);

  const options = {};

  const dataLabel = useMemo(() => {
    if (labels && labels.length > 0) {
      return labels;
    }
    return Object.keys(data);
  }, [labels, data]);

  return (
    <div className={className}>
      {chartName && <div className={styles.chartName}>{chartName}</div>}
      <Chart
        type="doughnut"
        data={{
          labels: dataLabel,
          datasets: [
            {
              label: title,
              data: chartDatas,
            },
          ],
        }}
        options={options}
      />
    </div>
  );
};

Doughnut.displayName = "Doughnut";
