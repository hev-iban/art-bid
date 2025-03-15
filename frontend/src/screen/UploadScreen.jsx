import React, { useState } from 'react';
import axios from 'axios';

const ArtUpload = () => {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);
    
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
                <input type="file" onChange={handleImageChange} required />
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