import { VerticalBar } from "@/components/ui/charts/verticalbar";
import { ViolentData } from "../ViolentMain";
import { ViolentChartsModalButton } from "../ViolentChartsModalButton";
import styles from "./ViolentCharts.module.scss";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

type Props = {
  dataObject: ViolentData[];
  title: string;
  labels: string[];
};
type VerticalBarProps = {
  className?: string;
  dataObject: ViolentData[];
  chartName?: string;
  colors?: string[];
  labels: string[];
};
// const VerticalBarDynamic = dynamic<VerticalBarProps>(() => import("@/components/ui/charts/verticalbar").then((modules) => modules.VerticalBar), { ssr: false });

export const ViolentCharts: React.FC<Props> = ({ dataObject, labels, title }) => {
  return (
    <>
      <div className={styles.modalButton}>
        <ViolentChartsModalButton dataObject={dataObject} labels={labels} title={title} />
      </div>
      <VerticalBar dataObject={dataObject} labels={labels} chartName={title} zoomNeed={false} />
    </>
  );
};

ViolentCharts.displayName = "ViolentCharts";
