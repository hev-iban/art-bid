// src/screen/Main.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ArtContext } from '../ArtContext'; // Import the ArtContext
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Main() {
    const { artList } = useContext(ArtContext); // Get the artList from context

    return (
        <div className="bg-black">
            <h1>Welcome to ArtBid</h1>
            <Link to="/upload" className="btn btn-primary">Go to Upload</Link>
            <Row xs={1} md={6} className="g-4">
                {artList.map((art, idx) => (
                    <Col key={idx}>
                        <Card>
                            <Card.Img variant="top" src={art.image} />
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