import React, { createContext, useState } from 'react';

export const FavoriteOrchidsContext = createContext();

export const FavoriteOrchidsProvider = ({ children }) => {
  const [favoriteOrchids, setFavoriteOrchids] = useState([]);

  return (
    <FavoriteOrchidsContext.Provider value={{ favoriteOrchids, setFavoriteOrchids }}>
      {children}
    </FavoriteOrchidsContext.Provider>
  );
};
