import { VerticalBar } from "@/components/ui/charts/verticalbar";
import { ViolenceState } from "@/store/modules/common/violence";
import { Grid } from "@mui/material";
import { ViolentTable } from "../ViolentTable";
import { SwitchBasic } from "@/components/ui/list/switch";
import { useMemo, useState } from "react";
import { mergeByCityWithYear, mergeByYearly } from "@/utils/openapi/police/police";
import { ViolentData } from "../ViolentMain";
import styles from "../ViolentMain.module.scss";

type Props = {
  violenceResponse: ViolenceState;
  cityNames: string[];
  title: string;
  labels: string[];
  datas: ViolentData[];
  changeCheckedCityNames: (items: string[]) => void;
};

export const ViolentParts: React.FC<Props> = ({ cityNames, violenceResponse, title, labels, datas, changeCheckedCityNames }) => {
  if (violenceResponse.items.length < 1) return null;

  return (
    <Grid container spacing={2}>
      <Grid item md={10}>
        <VerticalBar dataObject={datas} labels={labels} chartName={title} />
        <ViolentTable dataObject={datas} labels={labels} tableTitle={title} />
      </Grid>
      <Grid item md={2}>
        <SwitchBasic className={styles.violentSwitch} data={cityNames} parentCheckEvent={changeCheckedCityNames} />
      </Grid>
    </Grid>
  );
};

ViolentParts.displayName = "ViolentParts";
