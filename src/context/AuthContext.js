import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [kids, setKids] = useState([]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, kids, setKids }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
