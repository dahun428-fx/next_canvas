import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import WifiIcon from "@mui/icons-material/Wifi";
import BluetoothIcon from "@mui/icons-material/Bluetooth";
import { RefObject, useCallback, useEffect, useState } from "react";

type Props = {
  data: string[];
  className?: string;
  checkedCityName?: string[];
  parentCheckEvent?: (items: string[]) => void;
};

export const SwitchBasic: React.FC<Props> = ({ data, checkedCityName, className, parentCheckEvent }) => {
  const [checked, setChecked] = useState<string[]>([]);
  const [allChecked, setAllChecked] = useState<boolean>(true);
  useEffect(() => {
    if (checkedCityName && data.length > checkedCityName.length) {
      setChecked(checkedCityName);
      setAllChecked(false);
    } else {
      setChecked(data);
      setAllChecked(true);
    }
  }, []);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

    if (parentCheckEvent) {
      parentCheckEvent(newChecked);
    }
    if (newChecked.length === data.length) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  };

  const handleAllCheck = useCallback(() => {
    if (allChecked) {
      setChecked([]);
      if (parentCheckEvent) {
        parentCheckEvent([]);
      }
      setAllChecked(false);
    } else {
      setChecked([...data]);
      if (parentCheckEvent) {
        parentCheckEvent([...data]);
      }
      setAllChecked(true);
    }
  }, [checked, setChecked, data, allChecked, parentCheckEvent]);

  return (
    <div className={className}>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        subheader={
          <>
            <ListSubheader sx={{ textAlign: "center" }}>Settings</ListSubheader>
            <ListItem sx={{ border: "1px dotted #ddd", backgroundColor: "#ddd" }}>
              <ListItemText id={`switch-list-label-all`} primary={`전체`} />
              <Switch onChange={handleAllCheck} checked={allChecked} />
            </ListItem>
          </>
        }
      >
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return (
              <ListItem key={`switch-list-label-${item}_${index}`}>
                <ListItemText id={`switch-list-label-${item}`} primary={item} />
                <Switch
                  edge="end"
                  onChange={handleToggle(`${item}`)}
                  checked={checked.indexOf(`${item}`) !== -1}
                  inputProps={{
                    "aria-labelledby": `switch-list-label-${item}`,
                  }}
                />
              </ListItem>
            );
          })}
      </List>
    </div>
  );
};

SwitchBasic.displayName = "SwitchBasic";
