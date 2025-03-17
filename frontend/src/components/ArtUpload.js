import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ArtUpload = () => {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [artName, setArtName] = useState('');
    const [newBid, setNewBid] = useState(''); // Changed from artPrice to newBid
    const [message, setMessage] = useState('');
    const [imagePreview, setImagePreview] = useState(null); // State for image preview
    const navigate = useNavigate(); // Initialize useNavigate

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); // Generate a preview URL
        }
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleArtNameChange = (e) => {
        setArtName(e.target.value);
    };

    const handleNewBidChange = (e) => {
        setNewBid(e.target.value); // Updated to handle newBid
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', artName);
        formData.append('new_bid', newBid); // Use new_bid instead of art_price
        formData.append('description', description);
        formData.append('image', image);
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/art/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.data.success) {
                setMessage('Art uploaded successfully!');
            } else {
                setMessage('Upload failed: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error uploading art:', error);
            if (error.response) {
                setMessage('Upload failed: ' + (error.response.data.message || 'Unknown error'));
            } else {
                setMessage('Upload failed: ' + error.message);
            }
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Upload Art</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    value={artName}
                    onChange={handleArtNameChange}
                    placeholder="Art Name"
                    required
                    style={styles.input}
                />
                <input
                    type="number"
                    value={newBid} // Updated to use newBid
                    onChange={handleNewBidChange} // Updated to handle newBid
                    placeholder="New Bid"
                    required
                    style={styles.input}
                />
                <input
                    type="file"
                    onChange={handleImageChange}
                    required
                    style={styles.fileInput}
                    accept="image/*" // Allow only image files
                />
                
                {imagePreview && (
                    <div style={styles.imagePreviewContainer}>
                        <img
                            src={imagePreview}
                            alt="Art Preview"
                            style={styles.imagePreview}
                        />
                    </div>
                )}
                <textarea
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Description"
                    style={styles.textarea}
                />
                <button type="submit" style={styles.button}>Upload</button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
};

export default ArtUpload;

// Inline styles for a luxurious dark theme
const styles = {
    container: {
        maxWidth: '5000px',
        margin: '0 auto',
        padding: '40px',
        textAlign: 'center',
        backgroundColor: '#000000', // Black background
        borderRadius: '15px',
        boxShadow: '0 8px 16px rgba(255, 215, 0, 0.2)', // Gold shadow for luxury
        color: '#ffffff', // White text
        border: '1px solid rgba(255, 215, 0, 0.3)', // Gold border
    },
    heading: {
        fontSize: '28px',
        marginBottom: '30px',
        color: '#ffd700', // Gold text
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    input: {
        padding: '12px',
        fontSize: '16px',
        border: '1px solid rgba(255, 215, 0, 0.5)', // Gold border
        borderRadius: '8px',
        backgroundColor: '#1a1a1a', // Dark gray input background
        color: '#ffffff', // White text
        outline: 'none',
        transition: 'border-color 0.3s ease',
    },
    inputFocus: {
        borderColor: '#ffd700', // Gold border on focus
    },
    fileInput: {
        padding: '12px',
        fontSize: '16px',
        backgroundColor: '#1a1a1a', // Dark gray input background
        color: '#ffffff', // White text
        border: '1px solid rgba(255, 215, 0, 0.5)', // Gold border
        borderRadius: '8px',
        outline: 'none',
        transition: 'border-color 0.3s ease',
    },
    textarea: {
        padding: '12px',
        fontSize: '16px',
        border: '1px solid rgba(255, 215, 0, 0.5)', // Gold border
        borderRadius: '8px',
        backgroundColor: '#1a1a1a', // Dark gray input background
        color: '#ffffff', // White text
        resize: 'vertical',
        minHeight: '120px',
        outline: 'none',
        transition: 'border-color 0.3s ease',
    },
    button: {
        padding: '12px 24px',
        fontSize: '16px',
        backgroundColor: '#ffd700', // Gold background
        color: '#000000', // Black text
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#e5b800', // Darker gold on hover
    },
    message: {
        marginTop: '20px',
        color: '#ffd700', // Gold text
        fontSize: '16px',
    },
    imagePreviewContainer: {
        marginTop: '20px',
        textAlign: 'center',
    },
    imagePreview: {
        maxWidth: '100%',
        maxHeight: '300px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 215, 0, 0.5)', // Gold border
    },
};