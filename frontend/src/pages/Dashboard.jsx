import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import '../css/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 className="welcome">Welcome, {user?.name}! 👋</h2>
        <p className="role">
          Role: <strong>{user?.role?.toUpperCase()}</strong>
        </p>

        <div className="cards">
          {(user?.role === 'admin' || user?.role === 'manager') && (
            <Link to="/users" className="card">
              <div className="icon">👥</div>
              <div>Manage Users</div>
            </Link>
          )}

          <Link to="/profile" className="card">
            <div className="icon">👤</div>
            <div>My Profile</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;