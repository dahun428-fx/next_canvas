import { ReactNode, useContext } from "react";
import { Context } from "./context";
import styles from "./ModalProvider.module.scss";

type Props = {
  className?: string;
  children?: ReactNode;
};

/**
 * Modal close trigger on click
 * Uses with ModalProvider
 */
export const ModalCloser: React.FC<Props> = ({ className, children }) => {
  const { close } = useContext(Context);

  return (
    <div className={className ?? styles.wrapper} onClick={close}>
      {children}
    </div>
  );
};
