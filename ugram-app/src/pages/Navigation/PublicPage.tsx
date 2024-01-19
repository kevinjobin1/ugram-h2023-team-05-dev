import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../components/AuthContext/AuthContext';

function PublicPage({ children }: any) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return children;
  } else {
    return <Navigate to="/"></Navigate>;
  }
}

export default PublicPage;
