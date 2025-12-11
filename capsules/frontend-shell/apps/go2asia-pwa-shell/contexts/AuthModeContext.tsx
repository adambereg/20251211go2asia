'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthMode = 'authenticated' | 'unauthenticated';

interface AuthModeContextType {
  authMode: AuthMode;
  toggleAuthMode: () => void;
  isAuthenticated: boolean;
}

const AuthModeContext = createContext<AuthModeContextType | undefined>(undefined);

export function AuthModeProvider({ children }: { children: React.ReactNode }) {
  const [authMode, setAuthMode] = useState<AuthMode>('unauthenticated');

  // Загружаем состояние из localStorage при монтировании
  useEffect(() => {
    const savedMode = localStorage.getItem('authMode') as AuthMode;
    if (savedMode === 'authenticated' || savedMode === 'unauthenticated') {
      setAuthMode(savedMode);
    }
  }, []);

  // Сохраняем состояние в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('authMode', authMode);
  }, [authMode]);

  const toggleAuthMode = () => {
    setAuthMode((prev) => (prev === 'authenticated' ? 'unauthenticated' : 'authenticated'));
  };

  return (
    <AuthModeContext.Provider
      value={{
        authMode,
        toggleAuthMode,
        isAuthenticated: authMode === 'authenticated',
      }}
    >
      {children}
    </AuthModeContext.Provider>
  );
}

export function useAuthMode() {
  const context = useContext(AuthModeContext);
  if (context === undefined) {
    throw new Error('useAuthMode must be used within an AuthModeProvider');
  }
  return context;
}

