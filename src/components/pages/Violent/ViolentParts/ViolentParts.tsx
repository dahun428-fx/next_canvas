import { ViolenceState } from "@/store/modules/common/violence";
import { Grid } from "@mui/material";
import { ViolentTable } from "../ViolentTable";
import { SwitchBasic } from "@/components/ui/list/switch";
import { ViolentData } from "../ViolentMain";
import styles from "../ViolentMain.module.scss";
import { ViolentCharts } from "../ViolentCharts";
import { ChartType } from "chart.js";

type Props = {
  violenceResponse: ViolenceState;
  cityNames: string[];
  title: string;
  labels: string[];
  datas: ViolentData[];
  checkedCityName?: string[];
  changeCheckedCityNames: (items: string[]) => void;
  selectedChart: ChartType;
};

export const ViolentParts: React.FC<Props> = ({ cityNames, checkedCityName, violenceResponse, title, labels, datas, changeCheckedCityNames, selectedChart }) => {
  if (violenceResponse.items.length < 1) return null;

  return (
    <Grid container spacing={2}>
      <Grid item md={10}>
        {/* <VerticalBar dataObject={datas} labels={labels} chartName={title} /> */}
        <ViolentCharts dataObject={datas} labels={labels} title={title} selectedChart={selectedChart} />
        <ViolentTable dataObject={datas} labels={labels} tableTitle={title} />
      </Grid>
      <Grid item md={2}>
        <SwitchBasic className={styles.violentSwitch} data={cityNames} checkedCityName={checkedCityName} parentCheckEvent={changeCheckedCityNames} />
      </Grid>
    </Grid>
  );
};

ViolentParts.displayName = "ViolentParts";
