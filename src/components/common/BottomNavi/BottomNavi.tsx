import { BottomNavigation, BottomNavigationAction, Box, Card } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState } from "react";
import styles from "./BottomNavi.module.scss";
import { ChartType } from "chart.js";

type Props = {
  availableCharts?: ChartType[];
  handleChangeChartType: (value: ChartType) => void;
  selectedChartType: ChartType;
};

export const BottomNavi: React.FC<Props> = ({ availableCharts, selectedChartType, handleChangeChartType }) => {
  if (!availableCharts || availableCharts.length < 1) {
    return null;
  }

  //   const [value, setValue] = useState<ChartType>(selectedChartType);

  const ChartIcons = (chartType: ChartType) => {};

  console.log("value ===> ", selectedChartType);

  return (
    <Card className={styles.bottomfixed}>
      <BottomNavigation
        showLabels
        value={selectedChartType}
        onChange={(event, newValue) => {
          handleChangeChartType(newValue);
        }}
      >
        {availableCharts.map((item, index) => {
          return <BottomNavigationAction label="Recents" value={item} icon={<RestoreIcon />} />;
        })}
      </BottomNavigation>
    </Card>
  );
};

BottomNavi.displayName = "BottomNavi";
