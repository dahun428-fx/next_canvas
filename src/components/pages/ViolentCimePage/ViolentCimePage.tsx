import { Container } from "@mui/material";
import { PoliceMain } from "../Police";
import { BottomNavi } from "@/components/common/BottomNavi";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { loadOperation, selectPolice } from "@/store/modules/common/police";
import { loadOperations } from "@/store/modules/common/violence";
import { useSelector } from "@/store/hooks";

type Props = {};

export const ViolentCimePage: React.FC<Props> = () => {
  const initailized = useRef(false);
  const policeResponse = useSelector(selectPolice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!initailized.current && policeResponse.items.length < 1) {
      loadOperation(dispatch)();
      initailized.current = true;
    }
  }, [dispatch, initailized.current, policeResponse.items.length]);

  return (
    <Container maxWidth="xl">
      <PoliceMain />
      <BottomNavi />
    </Container>
  );
};

ViolentCimePage.displayName = "ViolentCimePage";
