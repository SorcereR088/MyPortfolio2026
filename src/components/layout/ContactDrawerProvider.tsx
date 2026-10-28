"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import ContactDrawer from "./ContactDrawer";

type ContactDrawerContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const ContactDrawerContext = createContext<ContactDrawerContextValue | null>(
  null,
);

export function useContactDrawer() {
  const ctx = useContext(ContactDrawerContext);
  if (!ctx)
    throw new Error(
      "useContactDrawer must be used within ContactDrawerProvider",
    );
  return ctx;
}

export default function ContactDrawerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ContactDrawerContext.Provider value={{ isOpen, open, close }}>
      {children}
      <ContactDrawer />
    </ContactDrawerContext.Provider>
  );
}

