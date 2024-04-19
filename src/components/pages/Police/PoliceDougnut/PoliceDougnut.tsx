import { Doughnut } from "@/components/ui/charts/doughnut";
import { DoughnutData } from "@/components/ui/charts/doughnut/Doughnut";
import { digit } from "@/utils/number";
import { useMemo } from "react";

type Props = {
  data: DoughnutData;
  title: string;
  className?: string;
  chartName?: string;
  colors?: string[];
};

export const PoliceDougnut: React.FC<Props> = ({ data, title, className, chartName, colors }) => {
  const adjustLabels = useMemo(() => {
    const labels: string[] = Object.keys(data);
    const chartDatas: number[] = Object.values(data);

    let result = [];
    for (let i = 0; i < labels.length; i++) {
      const text = `${labels[i]} (${digit(chartDatas[i])})`;
      result.push(text);
    }
    return result;
  }, [data]);

  return <Doughnut labels={adjustLabels} data={data} title={title} chartName={chartName} className={className} colors={colors} />;
};

PoliceDougnut.displayName = "PoliceDougnut";
