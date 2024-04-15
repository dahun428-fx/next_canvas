import { Container } from "@mui/material";
import { PoliceMain } from "../Police";
import { BottomNavi } from "@/components/common/BottomNavi";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { loadOperation } from "@/store/modules/common/police";
import { loadOperations } from "@/store/modules/common/violence";
import { ViolentYearly } from "../ViolentYearly";

type Props = {};

export const ViolentCimePage: React.FC<Props> = () => {
  const initailized = useRef(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!initailized.current) {
      loadOperation(dispatch)();
      loadOperations(dispatch)();
      initailized.current = true;
    }
  }, [dispatch, initailized.current]);

  return (
    <Container maxWidth="xl">
      <PoliceMain />
      <ViolentYearly />
      <BottomNavi />
    </Container>
  );
};

ViolentCimePage.displayName = "ViolentCimePage";
