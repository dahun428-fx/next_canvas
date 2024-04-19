import { ReactNode, useContext } from "react";
import { Context } from "./context";
import styles from "./ModalProvider.module.scss";

type Props = {
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
};

export const ModalOpener: React.FC<Props> = ({ children, className, disabled }) => {
  const { open } = useContext(Context);

  const handleClick = () => {
    disabled || open();
  };

  return (
    <div className={className ?? styles.wrapper} aria-haspopup={!disabled && "dialog"} onClick={handleClick}>
      {children}
    </div>
  );
};

ModalOpener.displayName = "ModalOpener";
