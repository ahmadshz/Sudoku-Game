import React, { createContext, useState } from 'react';

export const IsDarkMode = createContext();

const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <IsDarkMode.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </IsDarkMode.Provider>
  );
};

export default DarkModeProvider;
