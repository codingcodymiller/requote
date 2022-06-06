import React from 'react';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const value = {
    isAuthenticated: document.cookie.includes('user_id')
  };
  return <AuthContext.Provider value={value}>{ children }</AuthContext.Provider>;
}
