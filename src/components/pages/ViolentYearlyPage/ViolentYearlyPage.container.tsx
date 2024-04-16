import React, { useEffect, useRef, useState } from "react";
import { ViolentYearlyPage as Presenter } from "./ViolentYearlyPage";
import { useSelector } from "@/store/hooks";
import { ViolenceItem, loadOperations, selectViolence } from "@/store/modules/common/violence";
import { mergeByYearly } from "@/utils/openapi/police/police";
import { Police } from "@/models/api/open/police/SearchPoliceResponse";
import { useDispatch } from "react-redux";

type Props = {};

export const ViolentYearlyPage: React.FC<Props> = () => {
  const initailized = useRef(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!initailized.current) {
      loadOperations(dispatch)();
      initailized.current = true;
    }
  }, [dispatch, initailized.current]);

  return <Presenter />;
};

ViolentYearlyPage.displayName = "ViolentYearly";
