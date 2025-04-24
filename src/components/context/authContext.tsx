import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  pageTitle: string;
  setPageTitle: (title: string) => void;
  barWidth: boolean;
  setBarWidth: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [pageTitle, setPageTitle] = useState<string>("");
  const [barWidth, setBarWidth] = useState<boolean>(window.innerWidth > 768);

  const values: AuthContextType = {
    pageTitle,
    setPageTitle,
    barWidth,
    setBarWidth,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
