import { useSelector } from "@/store/hooks";
import { ViolentMain as Presenter } from "./ViolentMain";
import { selectViolence } from "@/store/modules/common/violence";
import { ChartType } from "chart.js";

type Props = {
  selectedChart: ChartType;
};

export const ViolentMain: React.FC<Props> = ({ selectedChart }) => {
  const violenceResponse = useSelector(selectViolence);

  return <Presenter violenceResponse={violenceResponse} selectedChart={selectedChart} />;
};

ViolentMain.displayName = "ViolentMain";
