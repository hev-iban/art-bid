// src/screen/Main.jsx
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../actions/productActions'; // Ensure this path is correct
import { ArtContext } from '../ArtContext'; // Import the ArtContext
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Main() {
    const { artList, setArtList } = useContext(ArtContext); // Get the artList and setArtList from context

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

    return (
        <div className="bg-black">
            <h1>Welcome to ArtBid</h1>
            <Link to="/upload" className="btn btn-primary">Go to Upload</Link>
            <Row xs={1} md={6} className="g-4">
                {artList.map((art, idx) => (
                    <Col key={idx}>
                        <Card>
                            <Card.Img variant="top" src={`http://127.0.0.1:8000${art.image}`} />
                            <Card.Body>
                                <Card.Title>Uploaded Art</Card.Title>
                                <Card.Text>{art.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Main;