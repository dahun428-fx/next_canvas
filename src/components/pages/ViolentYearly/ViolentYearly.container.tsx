import React, { useEffect, useState } from "react";
import { ViolentYearly as Presenter } from "./ViolentYearly";
import { useSelector } from "@/store/hooks";
import { ViolenceItem, selectViolence } from "@/store/modules/common/violence";
import { mergeByYearly } from "@/utils/openapi/police/police";
import { Police } from "@/models/api/open/police/SearchPoliceResponse";

type Props = {};

export const ViolentYearly: React.FC<Props> = () => {
  const violenceResponse = useSelector(selectViolence);

  // const [yearlyData, setYearlyData] = useState<Police[]>([]);

  useEffect(() => {
    // const datas = mergeByYearly(violenceResponse.items);
    // datas.map((item, index)=> {
    //   const years = Object.keys(item);
    //   const items = Object.values(item);
    // })
    // setYearlyData(items);
    // console.log("years ===> ", years);
    // console.log("items ===> ", items);
  }, [violenceResponse.items]);

  if (violenceResponse && violenceResponse.items && violenceResponse.items.length > 0) {
    return <Presenter violenceResponse={violenceResponse} />;
  }
  return null;
};

ViolentYearly.displayName = "ViolentYearly";
