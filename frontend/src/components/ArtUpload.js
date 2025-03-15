import React, { useState } from 'react';
import axios from 'axios';

const ArtUpload = () => {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [artName, setArtName] = useState(''); // State for art name
    const [artPrice, setArtPrice] = useState(''); // State for art price
    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleArtNameChange = (e) => {
        setArtName(e.target.value); // Update art name
    };

    const handleArtPriceChange = (e) => {
        setArtPrice(e.target.value); // Update art price
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);
        formData.append('name', artName); // Add art name to form data
        formData.append('art_price', artPrice); // Add art price to form data

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/art/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error uploading art:', error); // Log the full error
            if (error.response) {
                setMessage('Upload failed: ' + (error.response.data.error || 'Unknown error'));
            } else {
                setMessage('Upload failed: ' + error.message);
            }
        }
    };

    return (
        <div>
            <h1>Upload Art</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={artName} onChange={handleArtNameChange} placeholder="Art Name" required />
                <input type="number" value={artPrice} onChange={handleArtPriceChange} placeholder="Art Price" required />
                <input type="file" onChange ={handleImageChange} required />
                <input
                    type="text"
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Description"
                />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ArtUpload;