import { BottomNavi } from "@/components/common/BottomNavi";
import { Container } from "@mui/material";
import { ViolentMain } from "../Violent/ViolentMain.container";

type Props = {};

export const ViolentYearlyPage: React.FC<Props> = ({}) => {
  return (
    <Container maxWidth="xl">
      <ViolentMain />
      <BottomNavi />
    </Container>
  );
};

ViolentYearlyPage.displayName = "ViolentYearly";
