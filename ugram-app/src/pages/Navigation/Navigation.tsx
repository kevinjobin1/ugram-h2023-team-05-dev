import { Route, Routes } from 'react-router-dom';

import NotFound from '../404/NotFound';
import Home from '../Home/Home';
import ImageListPage from '../ImageList/ImageListPage';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import ProfilePage from '../Profile/ProfilePage';
import Signup from '../Signup/Signup';
import UserListPage from '../UserList/UserListPage';
import ProtectedPage from './ProtectedPage';
import PublicPage from './PublicPage';

export const Navigation = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicPage>
            <Login />
          </PublicPage>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicPage>
            <Signup />
          </PublicPage>
        }
      />

      <Route
        path={'/'}
        element={
          <ProtectedPage>
            <Home />
          </ProtectedPage>
        }
      />

      <Route
        path="/logout"
        element={
          <ProtectedPage>
            <Logout />
          </ProtectedPage>
        }
      />

      <Route
        path={'/users/:id'}
        element={
          <ProtectedPage>
            <ProfilePage />
          </ProtectedPage>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedPage>
            <UserListPage />
          </ProtectedPage>
        }
      />

      <Route
        path="/pictures"
        element={
          <ProtectedPage>
            <ImageListPage />
          </ProtectedPage>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
