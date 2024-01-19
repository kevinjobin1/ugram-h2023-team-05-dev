import './App.css';

import { Alert, Button, CssBaseline, ThemeProvider } from '@mui/material';
import * as Sentry from '@sentry/react';
import { useState } from 'react';
import ReactGA from 'react-ga';

import { AuthContextProvider } from './components/AuthContext/AuthContext';
import { NotificationContextProvider } from './components/Notifications/NotificationContext';
import { Navigation } from './pages/Navigation/Navigation';
import { getHealth } from './services/health.service';
import appTheme from './styles/theme';

const googleAnalyticsTrackingId = import.meta.env.GOOGLE_ANALYTICS_TRACKING_ID;

function App() {
  const [connectionError, setConnectionError] = useState('');
  const [showError, setShowError] = useState(false);

  ReactGA.initialize(googleAnalyticsTrackingId);

  getHealth().catch((error) => {
    setConnectionError(
      error.message + ': Connection to the server refused. (Is the server running?)',
    );
    setShowError(true);
  });

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <AuthContextProvider>
        <NotificationContextProvider>
          {showError && (
            <Alert
              severity="error"
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setShowError(false);
                    window.location.reload();
                  }}
                  sx={{
                    height: '100%',
                  }}
                >
                  RETRY
                </Button>
              }
              sx={{
                width: '50%',
                position: 'fixed',
                top: 10,
                left: '25%',
                zIndex: 1000,
              }}
            >
              {' '}
              {connectionError}{' '}
            </Alert>
          )}
          <div className="App">
            <Navigation />
          </div>
        </NotificationContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default Sentry.withProfiler(App);
