'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface AppShellContextType {
  isSideDrawerOpen: boolean;
  openSideDrawer: () => void;
  closeSideDrawer: () => void;
  toggleSideDrawer: () => void;
}

const AppShellContext = createContext<AppShellContextType | undefined>(undefined);

export function AppShellProvider({ children }: { children: React.ReactNode }) {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  const openSideDrawer = useCallback(() => {
    setIsSideDrawerOpen(true);
  }, []);

  const closeSideDrawer = useCallback(() => {
    setIsSideDrawerOpen(false);
  }, []);

  const toggleSideDrawer = useCallback(() => {
    setIsSideDrawerOpen((prev) => !prev);
  }, []);

  return (
    <AppShellContext.Provider
      value={{
        isSideDrawerOpen,
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
    throw new Error('useAppShell must be used within an AppShellProvider');
  }
  return context;
}

