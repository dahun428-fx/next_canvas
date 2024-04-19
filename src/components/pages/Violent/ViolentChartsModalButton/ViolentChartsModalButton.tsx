import { Modal, ModalOpener, ModalProvider } from "@/components/ui/modal";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import { Button } from "@mui/material";
import { ViolentData } from "../ViolentMain";
import { VerticalBar } from "@/components/ui/charts/verticalbar";
import styles from "./ViolentChartsModalButton.module.scss";
import { ModalSizeType } from "@/components/ui/modal/Modal";

type Props = { disabled?: boolean; dataObject: ViolentData[]; title: string; labels: string[] };
export const ViolentChartsModalButton: React.FC<Props> = ({ disabled, ...props }) => {
  return (
    <ModalProvider>
      <ModalOpener>
        <Button>
          <FilterNoneIcon />
        </Button>
      </ModalOpener>
      <Modal title={`title sample`} className={styles.container} size={ModalSizeType.lg}>
        <div>
          <VerticalBar dataObject={props.dataObject} labels={props.labels} chartName={props.title} />
        </div>
      </Modal>
    </ModalProvider>
  );
};
