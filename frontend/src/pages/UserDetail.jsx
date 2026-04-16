import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import '../css/UserDetail.css';

const UserDetail = () => {
  const { id } = useParams();
  const [u, setU] = useState(null);

  useEffect(() => {
    API.get(`/users/${id}`)
      .then(r => setU(r.data))
      .catch(console.error);
  }, [id]);

  if (!u) {
    return (
      <div>
        <Navbar />
        <div className="userdetail-loading">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="userdetail-container">
        <Link to="/users" className="userdetail-back">
          ← Back to Users
        </Link>

        <div className="userdetail-card">
          <h2 className="userdetail-name">{u.name}</h2>
          <p className="userdetail-email">{u.email}</p>

          <div className="userdetail-grid">
            <Info label="Role" value={u.role} />
            <Info label="Status" value={u.status} />
            <Info label="Created At" value={new Date(u.createdAt).toLocaleString()} />
            <Info label="Updated At" value={new Date(u.updatedAt).toLocaleString()} />
            <Info label="Created By" value={u.createdBy?.name || 'System'} />
            <Info label="Updated By" value={u.updatedBy?.name || '—'} />
          </div>

          <Link to={`/users/${id}/edit`} className="userdetail-edit-btn">
            Edit User
          </Link>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="userdetail-info">
    <div className="userdetail-info-label">{label}</div>
    <div className="userdetail-info-value">{value}</div>
  </div>
);

export default UserDetail;