import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions'; // Redux action
import Loader from '../components/Loader';
import Message from '../components/Message';

function Main() {
  const dispatch = useDispatch();

  // Get product list from Redux state
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts()); // Fetch products using Redux action
  }, [dispatch]);

  return (
    <Row xs={1} md={4} className="g-4 bg-black p-3">
      {loading ? (
        <Loader /> // Display loading spinner
      ) : error ? (
        <Message variant="danger">{error}</Message> // Show error message
      ) : (
        products.map((product) => (
          <Col key={product._id}>
            <Card className="h-100">
              <Link to={`/product/${product._id}`}>
                <Card.Img variant="top" src={product.image} alt={product.name} />
              </Link>
              <Card.Body>
                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                  <Card.Title>{product.name}</Card.Title>
                </Link>
                <Card.Text>${product.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
    </Row>
  );
}

export default Main;
