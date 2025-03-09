// src/components/ArtUpload.js
import React, { useState, useRef } from 'react';

const ArtUpload = () => {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const fileInputRef = useRef(null); // Create a ref for the file input

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
            const response = await fetch('http://127.0.0.1:8000/upload/', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                // Optionally reset the form
                setImage(null);
                setDescription('');
            } else {
                alert('Error: ' + JSON.stringify(data.error));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while uploading the image.');
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click(); // Trigger the file input click
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{ display: 'none' }} // Hide the file input
                    required
                />
                <button type="button" onClick={handleButtonClick}>
                    Upload Art
                </button>
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Enter a description for your art"
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ArtUpload;