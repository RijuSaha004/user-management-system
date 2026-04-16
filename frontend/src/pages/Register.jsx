import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/Register.css';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create an Account</h2>
        <p className="register-sub">Join the User Management System</p>

        {error && <div className="register-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label className="register-label">Full Name</label>
          <input
            className="register-input"
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={set('name')}
            required
          />

          <label className="register-label">Email Address</label>
          <input
            className="register-input"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={set('email')}
            required
          />

          <label className="register-label">Password</label>
          <input
            className="register-input"
            type="password"
            placeholder="Min. 6 characters"
            value={form.password}
            onChange={set('password')}
            required
          />

          <label className="register-label">Confirm Password</label>
          <input
            className="register-input"
            type="password"
            placeholder="Re-enter password"
            value={form.confirmPassword}
            onChange={set('confirmPassword')}
            required
          />

          <label className="register-label">Role</label>
          <select
            className="register-input"
            value={form.role}
            onChange={set('role')}
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>

          <button className="register-btn" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="register-footer">
          Already have an account?{' '}
          <Link to="/login" className="register-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;