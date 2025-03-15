// src/ArtContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ArtContext = createContext();

export const ArtProvider = ({ children }) => {
    const [artList, setArtList] = useState([]);

    const fetchArtUploads = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/art/uploads/');
            setArtList(response.data);
        } catch (error) {
            console.error('Error fetching art uploads:', error);
        }
    };

    useEffect(() => {
        fetchArtUploads();
    }, []);

    return (
        <ArtContext.Provider value={{ artList, setArtList }}>
            {children}
        </ArtContext.Provider>
    );
};