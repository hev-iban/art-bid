// Home.js
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem('authToken');

  if (!isAuthenticated) {
    // If not authenticated, redirect to login page
    navigate('/login');
    return null;
  }

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {/* Your protected content */}
    </div>
  );
};

export default Home;
