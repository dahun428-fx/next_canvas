import { VerticalBar } from "@/components/ui/charts/verticalbar";
import { TableBasic } from "@/components/ui/tables/tableBasic";
import { ViolenceState } from "@/store/modules/common/violence";
import { mergeByCityWithYear, mergeByYearly, policeCityArray } from "@/utils/openapi/police/police";
import { MouseEvent, SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import { ViolentTable } from "./ViolentTable/ViolentTable";
import { SwitchBasic } from "@/components/ui/list/switch";
import styles from "./ViolentMain.module.scss";
import { Box, Grid, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ViolentParts } from "./ViolentParts/ViolentParts";

type Props = {
  violenceResponse: ViolenceState;
};

export interface ViolentData {
  label: string;
  data: number[];
}

const cityNames = policeCityArray;

type TabType = "robber" | "a";

export const ViolentMain: React.FC<Props> = ({ violenceResponse }) => {
  if (violenceResponse.items.length < 1) return null;

  const [tabValue, setTabValue] = useState<TabType>("robber");

  const [checkedCityNamesWithRobber, setCheckedCityNamesWithRobber] = useState<string[]>(cityNames);

  const changeCheckedCityNamesWithRobber = (items: string[]) => {
    setCheckedCityNamesWithRobber(Array.from(new Set(items)));
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

  return (
    <div>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={(event: SyntheticEvent, value: TabType) => {
              setTabValue(value);
            }}
            variant="scrollable"
            // aria-label="lab API tabs example"
          >
            <Tab label={`강도`} value={"robber"} />
          </TabList>
        </Box>
        <TabPanel value={`robber`}>
          <ViolentParts labels={labels} cityNames={cityNames} title="연도별 / 지역별 강력범죄 추이 (강도)" datas={datasForRobber} violenceResponse={violenceResponse} changeCheckedCityNames={changeCheckedCityNamesWithRobber} />
        </TabPanel>
      </TabContext>
    </div>
  );
};

ViolentMain.displayName = "ViolentMain";
