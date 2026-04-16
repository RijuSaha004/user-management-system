import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get('/auth/me'); // cookie auto sent
        setUser(data);
      } catch {
        setUser(null);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const register = async (name, email, password, role) => {
    // console.log(name, email, password);
    
    const { data } = await API.post('/auth/register', { name, email, password, role });
    setUser(data.user);
    return data.user;
  };

  const login = async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password });
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    await API.post('/auth/logout'); // clear cookie on server
    setUser(null);

  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);