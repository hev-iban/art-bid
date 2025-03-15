import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import './ArtDetails.css'; // Import CSS for styling

function ArtDetails() {
    const location = useLocation(); // Get the location object
    const navigate = useNavigate(); // Initialize useNavigate
    const { art } = location.state || {}; // Get the art data from the location state

    if (!art) {
        return <div>No art data found.</div>; // Handle case where art data is missing
    }

    const imageUrl = `http://127.0.0.1:8000${art.image}`; // Construct the image URL

    return (
        <div className="art-details-container">
            <button onClick={() => navigate(-1)} className="back-button">Go Back</button>
            <div className="art-details">
                <img src={imageUrl} alt={art.art_name} className="art-image" />
                <div className="art-info">
                    <h1 className="art-title">{art.art_name}</h1>
                    <p className="art-description">{art.description}</p>
                    <p className="art-price">Price: ${art.art_price}</p>
                </div>
            </div>
        </div>
    );
}

export default ArtDetails;