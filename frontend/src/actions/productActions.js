import axios from 'axios';

export const fetchProducts = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/art/uploads/');
        return response.data; // Ensure this returns the expected structure
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; // Rethrow the error for handling in the component
    }
};