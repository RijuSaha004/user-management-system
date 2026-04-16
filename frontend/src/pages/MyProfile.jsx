import { useState, useEffect } from 'react';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import '../css/MyProfile.css';

const MyProfile = () => {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name:'', password:'' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    API.get('/users/profile').then(r => {
      setProfile(r.data);
      setForm({ name: r.data.name, password:'' });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put('/users/profile', form);
      setMsg('Profile updated successfully!');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error updating profile');
    }
  };

  if (!profile) {
    return (
      <div>
        <Navbar />
        <div className="profile-loading">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <h2>My Profile</h2>

        <div className="profile-card">
          <div className="profile-info-row">
            <span className="profile-label">Email</span>
            <span>{profile.email}</span>
          </div>

          <div className="profile-info-row">
            <span className="profile-label">Role</span>
            <span>{profile.role}</span>
          </div>

          <div className="profile-info-row">
            <span className="profile-label">Status</span>
            <span>{profile.status}</span>
          </div>

          <div className="profile-info-row">
            <span className="profile-label">Member since</span>
            <span>{new Date(profile.createdAt).toLocaleDateString()}</span>
          </div>

          {profile.updatedBy && (
            <div className="profile-info-row">
              <span className="profile-label">Last updated by</span>
              <span>{profile.updatedBy?.name}</span>
            </div>
          )}

          <hr style={{ margin: '20px 0' }} />

          <h3 style={{ marginTop: 0 }}>Update Profile</h3>

          {msg && <div className="profile-msg">{msg}</div>}

          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              className="profile-input"
              value={form.name}
              onChange={e => setForm({...form, name:e.target.value})}
              required
            />

            <label>New Password (optional)</label>
            <input
              className="profile-input"
              type="password"
              value={form.password}
              placeholder="Leave blank to keep current"
              onChange={e => setForm({...form, password:e.target.value})}
            />

            <button type="submit" className="profile-btn">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;