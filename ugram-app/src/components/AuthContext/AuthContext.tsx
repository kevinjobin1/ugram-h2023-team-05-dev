import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import client from '../../modules/axios-client';
import { Account, UserLogin } from '../../types/User';

type UserContext = {
  user: null | Account;
  login: (userLogin: UserLogin) => Promise<void>;
  logout: () => Promise<void>;
  getUser: () => Promise<void>;
  isAuthenticated: (id: string | undefined) => boolean;
};

export const AuthContext = createContext<UserContext>(null!);

export function AuthContextProvider({ children }: any) {
  const [user, setUser] = useState<Account | null>(null);
  const navigate = useNavigate();

  async function getUser() {
    return client
      .get('/account', { withCredentials: true })
      .then((response) => {
        setUser(response.data);
        sessionStorage.setItem('userId', response.data.userId);
      })
      .catch(() => {
        setUser(null);
      });
  }

  useEffect(() => {
    getUser();
  }, []);

  const login = async (userLogin: UserLogin) => {
    return client.post('/auth/signin', userLogin, { withCredentials: true }).then(() => {
      getUser().then(() => navigate('/', { replace: true }));
    });
  };

  const isAuthenticated = (id: string | undefined) => {
    return id != null && id == user?.userId;
  };

  const logout = async () => {
    return client.post('/auth/signout', {}, { withCredentials: true }).then(() => {
      setUser(null);
      sessionStorage.removeItem('userId');
      navigate('/');
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
