import { VerticalBar } from "@/components/ui/charts/verticalbar";
import { TableBasic } from "@/components/ui/tables/tableBasic";
import { ViolenceState } from "@/store/modules/common/violence";
import { mergeByCityWithYear, mergeByYearly } from "@/utils/openapi/police/police";
import { useMemo } from "react";

type Props = {
  violenceResponse: ViolenceState;
};

export const ViolentMain: React.FC<Props> = ({ violenceResponse }) => {
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
    <div>
      <VerticalBar dataObject={datasForRobber} labels={labels} chartName="연도별 / 지역별 강력범죄 추이 (강도)" />
      <TableBasic datas={datasForRobber} tableHeadData={labels} tableTitle="연도별 / 지역별 강력범죄 추이 (강도)" />
    </div>
  );
};

ViolentMain.displayName = "ViolentMain";
