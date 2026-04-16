import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';
import UserForm from './components/UserForm';
import MyProfile from './pages/MyProfile';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={
            <ProtectedRoute><MyProfile /></ProtectedRoute>} />
          <Route path="/users" element={
            <ProtectedRoute roles={['admin', 'manager']}><UserList /></ProtectedRoute>} />
          <Route path="/users/create" element={
            <ProtectedRoute roles={['admin']}><UserForm isEdit={false} /></ProtectedRoute>} />
          <Route path="/users/:id" element={
            <ProtectedRoute roles={['admin', 'manager']}><UserDetail /></ProtectedRoute>} />
          <Route path="/users/:id/edit" element={
            <ProtectedRoute roles={['admin', 'manager']}><UserForm isEdit={true} /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;