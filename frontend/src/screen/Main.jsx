import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { fetchProducts } from '../actions/productActions'; // Ensure this path is correct
import { ArtContext } from '../ArtContext'; // Import the ArtContext
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './Main.css'; // Import CSS for styling

function Main() {
    const { artList, setArtList } = useContext(ArtContext); // Get the artList and setArtList from context
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const loadArtUploads = async () => {
            try {
                const products = await fetchProducts();
                setArtList(products); // Update the artList in context
            } catch (error) {
                console.error('Error loading art uploads:', error);
            }
        };

        loadArtUploads();
    }, [setArtList]); // Dependency array to avoid infinite loop

    const handleCardClick = (art) => {
        navigate(`/art/${art.art_id}`, { state: { art } }); // Navigate to art details with art data
    };

    return (
        <div className="bg-black text-white p-4">
            <h1>Welcome to ArtBid</h1>
            <Link to="/upload" className="btn btn-primary mb-4">Go to Upload</Link>
            <Row xs={1} md={4} className="g-4">
                {artList.map((art) => {
                    const imageUrl = `http://127.0.0.1:8000${art.image}`; // Construct the image URL
                    return (
                        <Col key={art.art_id}> {/* Use art_id as the key */}
                            <Card className="art-card" onClick={() => handleCardClick(art)}>
                                <div className="card-image-container">
                                    <Card.Img variant="top" src={imageUrl} alt={art.art_name} className="card-image" />
                                </div>
                                <Card.Body className="card-body">
                                    <Card.Title className="card-title">{art.art_name}</Card.Title> {/* Display art_name */}
                                    <Card.Text className="card-text">
                                        {art.description} {/* Display description */}
                                        <br />
                                        Price: ${art.art_price} {/* Display art_price */}
                                    </Card.Text>
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