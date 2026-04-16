import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import '../css/UserList.css';

const UserList = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data } = await API.get('/users', {
                params: { search, role: roleFilter, status: statusFilter, page, limit: 8 },
            });
            setUsers(data.users);
            setPages(data.pages);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, [search, roleFilter, statusFilter, page]);

    const handleDeactivate = async (id) => {
        await API.delete(`/users/${id}`);
        fetchUsers();
    };

    return (
        <div>
            <Navbar />

            <div className="userlist-container">
                <div className="userlist-header">
                    <h2>User Management</h2>
                    {user?.role === 'admin' && (
                        <Link to="/users/create" className="userlist-create-btn">
                            + New User
                        </Link>
                    )}
                </div>

                <div className="userlist-filters">
                    <input
                        className="userlist-input"
                        placeholder="Search name or email..."
                        value={search}
                        onChange={e => { setSearch(e.target.value); setPage(1); }}
                    />

                    <select
                        className="userlist-select"
                        value={roleFilter}
                        onChange={e => { setRoleFilter(e.target.value); setPage(1); }}
                    >
                        <option value="">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="user">User</option>
                    </select>

                    <select
                        className="userlist-select"
                        value={statusFilter}
                        onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                {loading ? (
                    <p className="userlist-loading">Loading...</p>
                ) : (
                    <table className="userlist-table">
                        <thead className="userlist-thead">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map(u => (
                                <tr key={u._id} className="userlist-row">
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>

                                    <td>
                                        <span
                                            className="userlist-badge"
                                            style={{ background: roleColor(u.role) }}
                                        >
                                            {u.role}
                                        </span>
                                    </td>

                                    <td>
                                        <span
                                            className={`userlist-badge ${u.status === 'active'
                                                    ? 'userlist-badge-active'
                                                    : 'userlist-badge-inactive'
                                                }`}
                                        >
                                            {u.status}
                                        </span>
                                    </td>

                                    <td className="userlist-actions">
                                        <Link to={`/users/${u._id}`} className="userlist-view-btn">
                                            View
                                        </Link>

                                        <Link to={`/users/${u._id}/edit`} className="userlist-edit-btn">
                                            Edit
                                        </Link>

                                        {user?.role === 'admin' && u._id !== user._id && (
                                            <button
                                                onClick={() => handleDeactivate(u._id)}
                                                className="userlist-del-btn"
                                            >
                                                Deactivate
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className="userlist-pagination">
                    <button
                        className="userlist-page-btn"
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                    >
                        Prev
                    </button>

                    <span>Page {page} of {pages}</span>

                    <button
                        className="userlist-page-btn"
                        disabled={page === pages}
                        onClick={() => setPage(p => p + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

const roleColor = (role) =>
    role === 'admin' ? '#dbeafe' :
        role === 'manager' ? '#fef3c7' :
            '#f3f4f6';

export default UserList;