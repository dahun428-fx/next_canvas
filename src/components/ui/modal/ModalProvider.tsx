import React, { ReactElement, ReactNode, useCallback, useState } from "react";
import { Context } from "./context";

type Props = {
  children?: ReactNode;
};

export const ModalProvider: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return <Context.Provider value={{ isOpen, open, close }}>{children}</Context.Provider>;
};
