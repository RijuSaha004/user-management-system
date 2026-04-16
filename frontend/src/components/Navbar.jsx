import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="nav">
      <span className="brand">UserMS</span>
      <div className="links">
        <Link to="/dashboard" className="link">Dashboard</Link>
        {(user?.role === 'admin' || user?.role === 'manager') && (
          <Link to="/users" className="link">Users</Link>
        )}
        <Link to="/profile" className="link">My Profile</Link>
        <button onClick={handleLogout} className="btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;