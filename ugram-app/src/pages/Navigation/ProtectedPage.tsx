import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthContext } from '../../components/AuthContext/AuthContext';
import ResponsiveLayout from '../../components/Layout/ResponsiveLayout';

function ProtectedPage({ children }: any) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user && !sessionStorage.getItem('userId')) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  } else {
    return <ResponsiveLayout>{children}</ResponsiveLayout>;
  }
}

export default ProtectedPage;
