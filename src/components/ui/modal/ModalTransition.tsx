import { ReactNode, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./ModalTransition.module.scss";

type Props = {
  isOpen: boolean;
  children: ReactNode;
};

export const ModalTransition: React.FC<Props> = ({ isOpen, children }) => {
  const ref = useRef(null);

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        exitActive: styles.exitActive,
        exit: styles.exit,
      }}
      unmountOnExit
      nodeRef={ref}
    >
      <div ref={ref}>{children}</div>
    </CSSTransition>
  );
};

ModalTransition.displayName = "ModalTransition";
