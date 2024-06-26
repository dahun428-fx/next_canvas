import { ReactElement, createContext } from "react";

export const Context = createContext({
  isOpen: false,
  open: () => {
    //noop
  },
  close: () => {},
});

export type ModalContentContext = {
  isOpen: boolean;
  title?: string | ReactElement;
  content?: ReactElement;
  close?: () => void;
};

export type ModalContentDispatchContext<T> = {
  showModal: (content: ReactElement, title?: string | ReactElement) => Promise<T | void>;
};

export const ModalContentContext = createContext<ModalContentContext>({
  isOpen: false,
});

export const ModalContentDispatchContext = createContext<ModalContentDispatchContext<unknown>>({
  async showModal() {
    //noop
  },
});
