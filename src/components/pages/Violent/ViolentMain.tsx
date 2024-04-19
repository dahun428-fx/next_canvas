import { VerticalBar } from "@/components/ui/charts/verticalbar";
import { TableBasic } from "@/components/ui/tables/tableBasic";
import { ViolenceState } from "@/store/modules/common/violence";
import { PoliceType, mergeByCityWithYear, mergeByYearly, policeCityArray } from "@/utils/openapi/police/police";
import { MouseEvent, SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import { ViolentTable } from "./ViolentTable/ViolentTable";
import { SwitchBasic } from "@/components/ui/list/switch";
import styles from "./ViolentMain.module.scss";
import { Box, Grid, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ViolentParts } from "./ViolentParts/ViolentParts";
import { ChartType, ChartTypeRegistry } from "chart.js";

// export type ViolentAcceptableChartType = Pick<ChartTypeRegistry, "line" | "bar" | "polarArea">;

export interface ViolentData {
  label: string;
  data: number[];
}

type Props = {
  violenceResponse: ViolenceState;
  selectedChart: ChartType;
};

const cityNames = policeCityArray;

export const ViolentMain: React.FC<Props> = ({ violenceResponse, selectedChart }) => {
  if (violenceResponse.items.length < 1) return null;

  const [tabValue, setTabValue] = useState<PoliceType>(PoliceType.ROBBER);

  const [checkedCityNamesWithRobber, setCheckedCityNamesWithRobber] = useState<string[]>(cityNames);
  const [checkedCityNamesWithMurder, setCheckedCityNamesWithMurder] = useState<string[]>(cityNames);
  const [checkedCityNamesWithTheft, setCheckedCityNamesWithTheft] = useState<string[]>(cityNames);
  const [checkedCityNamesWithViolence, setCheckedCityNamesWithViolence] = useState<string[]>(cityNames);

  const changeCheckedCityNamesWithRobber = (items: string[]) => {
    setCheckedCityNamesWithRobber(Array.from(new Set(items)));
  };
  const changeCheckedCityNamesWithMurder = (items: string[]) => {
    setCheckedCityNamesWithMurder(Array.from(new Set(items)));
  };
  const changeCheckedCityNamesWithTheft = (items: string[]) => {
    setCheckedCityNamesWithTheft(Array.from(new Set(items)));
  };
  const changeCheckedCityNamesWithViolence = (items: string[]) => {
    setCheckedCityNamesWithViolence(Array.from(new Set(items)));
  };

  const labels = useMemo(() => {
    const mergedData = mergeByYearly(violenceResponse.items);
    return mergedData.map((item, index) => {
      return Object.keys(item)[0];
    });
  }, [violenceResponse]);

  const datasForRobber = useMemo(() => {
    let result: ViolentData[] = [];
    mergeByCityWithYear(violenceResponse.items).forEach((item, index) => {
      if (checkedCityNamesWithRobber.includes(item.city)) {
        result.push({ label: item.city, data: item.강도 });
      }
    });

    return result;
  }, [violenceResponse, checkedCityNamesWithRobber]);
  const datasForMurder = useMemo(() => {
    let result: ViolentData[] = [];
    mergeByCityWithYear(violenceResponse.items).forEach((item, index) => {
      if (checkedCityNamesWithMurder.includes(item.city)) {
        result.push({ label: item.city, data: item.살인 });
      }
    });

    return result;
  }, [violenceResponse, checkedCityNamesWithMurder]);
  const datasForTheft = useMemo(() => {
    let result: ViolentData[] = [];
    mergeByCityWithYear(violenceResponse.items).forEach((item, index) => {
      if (checkedCityNamesWithTheft.includes(item.city)) {
        result.push({ label: item.city, data: item.절도 });
      }
    });

    return result;
  }, [violenceResponse, checkedCityNamesWithTheft]);
  const datasForViolence = useMemo(() => {
    let result: ViolentData[] = [];
    mergeByCityWithYear(violenceResponse.items).forEach((item, index) => {
      if (checkedCityNamesWithViolence.includes(item.city)) {
        result.push({ label: item.city, data: item.폭력 });
      }
    });

    return result;
  }, [violenceResponse, checkedCityNamesWithViolence]);

  return (
    <div>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={(event: SyntheticEvent, value: PoliceType) => {
              setTabValue(value);
            }}
            // variant="scrollable"
            centered
            // aria-label="lab API tabs example"
          >
            <Tab label={`${PoliceType.ROBBER}`} value={PoliceType.ROBBER} />
            <Tab label={`${PoliceType.MURDER}`} value={PoliceType.MURDER} />
            <Tab label={`${PoliceType.THEFT}`} value={PoliceType.THEFT} />
            <Tab label={`${PoliceType.VIOLENCE}`} value={PoliceType.VIOLENCE} />
          </TabList>
        </Box>
        <TabPanel value={PoliceType.ROBBER}>
          <ViolentParts selectedChart={selectedChart} labels={labels} cityNames={cityNames} title={`연도별 / 지역별 강력범죄 추이 (${PoliceType.ROBBER})`} datas={datasForRobber} violenceResponse={violenceResponse} changeCheckedCityNames={changeCheckedCityNamesWithRobber} checkedCityName={checkedCityNamesWithRobber} />
        </TabPanel>
        <TabPanel value={PoliceType.MURDER}>
          <ViolentParts selectedChart={selectedChart} labels={labels} cityNames={cityNames} title={`연도별 / 지역별 강력범죄 추이 (${PoliceType.MURDER})`} datas={datasForMurder} violenceResponse={violenceResponse} changeCheckedCityNames={changeCheckedCityNamesWithMurder} checkedCityName={checkedCityNamesWithMurder} />
        </TabPanel>
        <TabPanel value={PoliceType.THEFT}>
          <ViolentParts selectedChart={selectedChart} labels={labels} cityNames={cityNames} title={`연도별 / 지역별 강력범죄 추이 (${PoliceType.THEFT})`} datas={datasForTheft} violenceResponse={violenceResponse} changeCheckedCityNames={changeCheckedCityNamesWithTheft} checkedCityName={checkedCityNamesWithTheft} />
        </TabPanel>
        <TabPanel value={PoliceType.VIOLENCE}>
          <ViolentParts selectedChart={selectedChart} labels={labels} cityNames={cityNames} title={`연도별 / 지역별 강력범죄 추이 (${PoliceType.VIOLENCE})`} datas={datasForViolence} violenceResponse={violenceResponse} changeCheckedCityNames={changeCheckedCityNamesWithViolence} checkedCityName={checkedCityNamesWithViolence} />
        </TabPanel>
      </TabContext>
    </div>
  );
};

ViolentMain.displayName = "ViolentMain";
