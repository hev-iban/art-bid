// src/screen/UploadScreen.jsx
import React, { useState, useRef, useContext } from 'react';
import { ArtContext } from '../ArtContext'; // Import the ArtContext
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UploadScreen = () => {
    const { addArt } = useContext(ArtContext); // Get the addArt function from context
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const fileInputRef = useRef(null); // Reference for the file input
    const navigate = useNavigate(); // Initialize useNavigate

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
                // Add the uploaded art to the context
                addArt({ image: URL.createObjectURL(image), description });
                // Redirect to the Main screen
                navigate('/'); // Redirect to the main screen
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
        <div className="upload-screen">
            <h2>Upload Art</h2>
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
        </div>
    );
};

export default UploadScreen;