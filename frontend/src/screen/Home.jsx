import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product'; // Ensure this file exists

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authToken');

    if (!isAuthenticated) {
      navigate('/login'); // Redirect if not authenticated
    } else {
      async function fetchProducts() {
        try {
          const { data } = await axios.get('http://127.0.0.1:8000/api/products/');
          setProducts(data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }
      fetchProducts();
    }
  }, [navigate]);

  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
