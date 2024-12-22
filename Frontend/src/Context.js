import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const savedToken = localStorage.getItem('authToken');
  console.log('Saved Token:', savedToken);

  const [authToken, setAuthToken] = useState(savedToken);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem('authToken', authToken);
    } else {
      localStorage.removeItem('authToken');
    }
  }, [authToken]);

  const handleLogin = (newToken) => {
    setAuthToken(newToken);
  };

  const handleLogout = () => {
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};