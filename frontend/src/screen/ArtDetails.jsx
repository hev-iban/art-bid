import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './ArtDetails.css';

function ArtDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const { art_id } = useParams(); // Extract art_id from the URL
    const { art: initialArt } = location.state || {};

    const [art, setArt] = useState(initialArt || {});
    const [newBid, setNewBid] = useState('');
    const [bids, setBids] = useState([]);

    // Fetch art details and bid history when the component mounts
    useEffect(() => {
        const fetchArtDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/art/${art_id}/`);
                setArt(response.data);
                setBids(response.data.bids || []); // Initialize bid history
            } catch (error) {
                console.error('Error fetching art details:', error);
            }
        };

        if (!initialArt) {
            fetchArtDetails();
        } else {
            setBids(initialArt.bids || []); // Initialize bid history from initialArt
        }
    }, [art_id, initialArt]);

    const handleBidSubmit = async (e) => {
        e.preventDefault();

        const bidAmount = parseFloat(newBid);

        if (isNaN(bidAmount) || bidAmount <= art.current_bid) {
            alert('Your bid must be higher than the current bid.');
            return;
        }

        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/art/${art_id}/bid/`,
                { bid_amount: bidAmount },
                {
                    headers: {
                        'X-CSRFToken': getCookie('csrftoken'), // Include CSRF token if needed
                    },
                }
            );

            if (response.data.success) {
                // Update the art details and bid history
                setArt((prevArt) => ({
                    ...prevArt,
                    current_bid: response.data.current_bid,
                }));
                setBids(response.data.bids); // Update bid history with the latest data
                setNewBid('');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error placing bid:', error);
            alert('Failed to place bid. Please try again.');
        }
    };

    if (!art) {
        return <div>No art data found.</div>;
    }

    const imageUrl = `http://127.0.0.1:8000${art.image}`;

    return (
        <div className="art-details-container">
            <button onClick={() => navigate(-1)} className="back-button">Go Back</button>
            <div className="art-details">
                <img src={imageUrl} alt={art.art_name} className="art-image" />
                <div className="art-info">
                    <h1 className="art-title">{art.art_name}</h1>
                    <p className="art-description">{art.description}</p>
                    <p className="art-price">Starting Price: ${art.art_price}</p>
                    <p className="current-bid">Current Bid: ${art.current_bid}</p>

                    <form onSubmit={handleBidSubmit} className="bid-form">
                        <label htmlFor="bidAmount">Your Bid:</label>
                        <input
                            type="number"
                            id="bidAmount"
                            value={newBid}
                            onChange={(e) => setNewBid(e.target.value)}
                            min={art.current_bid + 1}
                            step="0.01"
                            required
                        />
                        <button type="submit" className="bid-button">Place Bid</button>
                    </form>

                    <div className="bid-history">
                        <h3>Bid History</h3>
                        {bids.length === 0 ? (
                            <p>No bids yet.</p>
                        ) : (
                            <ul>
                                {bids.map((bid, index) => (
                                    <li key={index}>
                                        {bid.bidder}: ${bid.bid_amount} (at {new Date(bid.created_at).toLocaleString()})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArtDetails;

// Helper function to get CSRF token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}