'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AppShellContextValue {
  isOpen: boolean;
  openSideDrawer: () => void;
  closeSideDrawer: () => void;
  toggleSideDrawer: () => void;
}

const AppShellContext = createContext<AppShellContextValue | undefined>(undefined);

export function AppShellProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openSideDrawer = () => setIsOpen(true);
  const closeSideDrawer = () => setIsOpen(false);
  const toggleSideDrawer = () => setIsOpen((prev) => !prev);

  return (
    <AppShellContext.Provider
      value={{
        isOpen,
        openSideDrawer,
        closeSideDrawer,
        toggleSideDrawer,
      }}
    >
      {children}
    </AppShellContext.Provider>
  );
}

export function useAppShell() {
  const context = useContext(AppShellContext);
  if (context === undefined) {
    throw new Error('useAppShell must be used within AppShellProvider');
  }
  return context;
}













