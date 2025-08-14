import React, { createContext, useContext, useState } from 'react';

const GalleryHoverContext = createContext();

export const GalleryHoverProvider = ({ children }) => {
  const [isAnyGalleryHovered, setIsAnyGalleryHovered] = useState(false);
  return (
    <GalleryHoverContext.Provider value={{ isAnyGalleryHovered, setIsAnyGalleryHovered }}>
      {children}
    </GalleryHoverContext.Provider>
  );
};

export const useGalleryHover = () => useContext(GalleryHoverContext); 