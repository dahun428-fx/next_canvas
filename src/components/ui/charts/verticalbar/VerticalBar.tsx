import { isObject } from "chart.js/helpers";
import { useMemo } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./VerticalBar.module.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export type VerticalBarDataObject = {
  label: string;
  data: number[];
};

type Props = {
  className?: string;
  dataObject: VerticalBarDataObject[];
  chartName?: string;
  colors?: string[];
  labels: string[];
};

export const VerticalBar: React.FC<Props> = ({ labels, dataObject, chartName, className, colors }) => {
  const chartDatas: VerticalBarDataObject[] = dataObject;

  const defaultColor = useMemo(() => {
    if (colors && colors.length === labels.length) {
      return colors;
    }
    return ["#FFC0CB", "#FFDAB9", "#E6E6FA", "#B0E0E6", "#F0E68C", "#F5FFFA", "#FFFACD", "#77DD77", "#89CFF0", "#FDFD96", "#F4C2C2", "#CA9BF7", "#A0D8EF", "#F498AD", "#87CEEB", "#A7DBA8", "#E6A4B4", "#FFB347"];
  }, [colors, labels]);

  const options = {};

  const data = {
    labels,
    datasets: chartDatas.map((item, index) => {
      return {
        ...item,
        backgroundColor: defaultColor[index],
        borderColor: defaultColor[index],
      };
    }),
  };

  return (
    <div className={className}>
      {chartName && <div className={styles.chartName}>{chartName}</div>}
      <Bar options={options} data={data} />
    </div>
  );
};

VerticalBar.displayName = "VerticalBar";
