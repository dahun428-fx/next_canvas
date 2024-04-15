import { BottomNavi } from "@/components/common/BottomNavi";
import { VerticalBar } from "@/components/ui/charts/verticalbar";
import { ViolenceState } from "@/store/modules/common/violence";
import { mergeByCityWithYear, mergeByYearly } from "@/utils/openapi/police/police";
import { Container } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useMemo } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Props = { violenceResponse: ViolenceState };

export const ViolentYearlyPage: React.FC<Props> = ({ violenceResponse }) => {
  if (violenceResponse.items.length < 1) return null;

  const labels = useMemo(() => {
    const mergedData = mergeByYearly(violenceResponse.items);
    return mergedData.map((item, index) => {
      return Object.keys(item)[0];
    });
  }, [violenceResponse]);

  const datasForRobber = useMemo(() => {
    return mergeByCityWithYear(violenceResponse.items).map((item, index) => {
      return { label: item.city, data: item.강도 };
    });
  }, [violenceResponse]);

  return (
    <Container maxWidth="xl">
      <VerticalBar dataObject={datasForRobber} labels={labels} chartName="연도별 / 지역별 강력범죄 추이 (강도)" />
      <BottomNavi />
    </Container>
  );
};

ViolentYearlyPage.displayName = "ViolentYearly";
