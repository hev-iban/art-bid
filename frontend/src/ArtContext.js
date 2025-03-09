// src/ArtContext.js
import React, { createContext, useState } from 'react';

export const ArtContext = createContext();

export const ArtProvider = ({ children }) => {
    const [artList, setArtList] = useState([]);

    const addArt = (art) => {
        setArtList((prevArtList) => [...prevArtList, art]);
    };

    return (
        <ArtContext.Provider value={{ artList, addArt }}>
            {children}
        </ArtContext.Provider>
    );
};