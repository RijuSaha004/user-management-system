import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/axios';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';
import '../css/UserForm.css';

const UserForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'user', status:'active' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      API.get(`/users/${id}`).then(r => {
        const { name, email, role, status } = r.data;
        setForm({ name, email, password:'', role, status });
      });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isEdit) {
        await API.put(`/users/${id}`, form);
      } else {
        await API.post('/users', form);
      }
      navigate('/users');
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving user');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>{isEdit ? 'Edit User' : 'Create User'}</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit} className="form">
          <label>Name</label>
          <input
            className="input"
            value={form.name}
            onChange={e => setForm({...form, name:e.target.value})}
            required
          />

          <label>Email</label>
          <input
            className="input"
            type="email"
            value={form.email}
            onChange={e => setForm({...form, email:e.target.value})}
            required
          />

          <label>Password {isEdit && '(leave blank to keep current)'}</label>
          <input
            className="input"
            type="password"
            value={form.password}
            onChange={e => setForm({...form, password:e.target.value})}
            {...(!isEdit && { required: true })}
          />

          {currentUser?.role === 'admin' && (
            <>
              <label>Role</label>
              <select
                className="input"
                value={form.role}
                onChange={e => setForm({...form, role:e.target.value})}
              >
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </>
          )}

          <label>Status</label>
          <select
            className="input"
            value={form.status}
            onChange={e => setForm({...form, status:e.target.value})}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button type="submit" className="btn">
            {isEdit ? 'Update User' : 'Create User'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;