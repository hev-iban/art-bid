import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../actions/productActions';
import { ArtContext } from '../ArtContext';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import './Main.css';

function Main() {
    const { artList, setArtList } = useContext(ArtContext);
    const navigate = useNavigate();
    const [updatedArtList, setUpdatedArtList] = useState(artList);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadArtUploads = async () => {
            try {
                const products = await fetchProducts();
                setArtList(products);
                setUpdatedArtList(products);
            } catch (error) {
                console.error('Error loading art uploads:', error);
            } finally {
                setLoading(false);
            }
        };

        loadArtUploads();
    }, [setArtList]);

    const handleCardClick = (art) => {
        navigate(`/art/${art.art_id}`, { state: { art } });
    };

    const handleNewBid = async (artId, newBid) => {
        try {
            await axios.post(`http://localhost:8000/api/arts/${artId}/bid/`, {
                bid_amount: newBid,
                bidder: 'Anonymous',
            });

            setUpdatedArtList((prevArtList) =>
                prevArtList.map((art) =>
                    art.art_id === artId
                        ? { ...art, current_bid: newBid, art_price: newBid }
                        : art
                )
            );
        } catch (error) {
            console.error('Error placing bid:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-black text-white p-4">
            <h1>Welcome to ArtBid</h1>
            <Link to="/upload" className="btn btn-primary mb-4">Go to Upload</Link>
            <Row xs={1} md={4} className="g-4">
                {updatedArtList.map((art) => {
                    const imageUrl = `http://localhost:8000${art.image}`;
                    return (
                        <Col key={art.art_id}>
                            <Card className="art-card" onClick={() => handleCardClick(art)}>
                                <div className="card-image-container">
                                    <Card.Img
                                        variant="top"
                                        src={imageUrl}
                                        alt={art.art_name}
                                        className="card-image"
                                        onError={(e) => {
                                            e.target.src = 'path/to/placeholder-image.jpg';
                                        }}
                                    />
                                </div>
                                <Card.Body className="card-body">
                                    <Card.Title className="card-title">{art.art_name}</Card.Title>
                                    <Card.Text className="card-text">
                                        {art.description}
                                        <br />
                                        Price: ${art.art_price}
                                        <br />
                                        Current Bid: ${art.current_bid}
                                    </Card.Text>
                                    <button
                                        className="btn btn-success mt-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const newBid = art.current_bid + 10;
                                            handleNewBid(art.art_id, newBid);
                                        }}
                                    >
                                        Place Bid
                                    </button>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}

export default Main;