import React from 'react';

type AuthContextData = {
  isAuthenticated: boolean;
}

export const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const value: AuthContextData = {
    isAuthenticated: document.cookie.includes('user_id')
  };
  return <AuthContext.Provider value={value}>{ children }</AuthContext.Provider>;
}
