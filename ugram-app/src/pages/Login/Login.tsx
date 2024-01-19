import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import {
  Alert,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Container,
  Divider,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';

import { AuthContext } from '../../components/AuthContext/AuthContext';
import { UserLogin } from '../../types/User';

const host = import.meta.env.VITE_API_URL;

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [openAlert, setOpenAlert] = useState(false);
  const [loginError, setLoginError] = useState('');

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({
    resolver: yupResolver(validationSchema),
    criteriaMode: 'all',
  });

  const onSubmit = (userLogin: UserLogin) => {
    login(userLogin).catch((error: any) => {
      switch (error.response.status) {
        case 500:
          setLoginError('Internal server error');
          setOpenAlert(true);
          break;
        default:
          setLoginError(error.response.data.message);
          setOpenAlert(true);
          break;
      }
    });
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundPosition: 'center',
        background:
          'linear-gradient(to left top, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d)',
        backgroundSize: '200% 200%',
        animation: 'moving 7s ease infinite',
        boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.4)',
        padding: 0,
        margin: 0,
        width: '100%',
        height: '100vh',
        display: { xs: 'block', sm: 'flex' },
      }}
    >
      <Card
        sx={{
          m: 'auto',
          width: { xs: '100%', sm: 600 },
          padding: { xs: 1, sm: 5 },
        }}
      >
        <Stack sx={{ justifyContent: 'center', alignItems: 'center', m: 2, rowGap: 1 }}>
          <Avatar src="/logo.png" alt="ugram-logo" sx={{ width: 120, height: 120 }} />
          <Typography
            component="h1"
            variant="h5"
            sx={{ textAlign: 'center', textTransform: 'Capitalize' }}
          >
            {'Sign in to your account'}
          </Typography>
        </Stack>

        <CardContent component="form">
          <TextField
            required
            {...register('email')}
            id="email"
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            fullWidth
            margin="normal"
            autoComplete="email"
            color="secondary"
            error={errors.email ? true : false}
            helperText={errors.email?.message}
          />
          <TextField
            required
            {...register('password')}
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            fullWidth
            margin="dense"
            label="Password"
            color="secondary"
            autoComplete="current-password"
            error={errors.password ? true : false}
            helperText={errors.password?.message}
          />
          <Divider sx={{ width: '100%', mt: 2 }} />

          <Collapse in={openAlert}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {loginError}
            </Alert>
          </Collapse>
        </CardContent>

        <CardActions>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ width: '100%' }}
          >
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="info"
              onClick={handleSubmit(onSubmit)}
              sx={{
                mt: 1,
                height: 50,
                fontSize: 18,
              }}
            >
              {'Sign In'}
            </Button>

            <Divider sx={{ width: '100%', my: 2 }}>
              <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>{' '}
            </Divider>
            <Button
              component={RouterLink}
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<GoogleIcon />}
              to={`${host}/auth/google`}
            >
              {'Sign In with Google'}
            </Button>
            <Divider sx={{ width: '100%', my: 3 }} />
            <Typography variant="body1" color="text.secondary">
              {"Don't have an account?"}{' '}
              <Link
                component={RouterLink}
                underline="hover"
                to="/signup"
                sx={{
                  marginTop: 2,
                  color: 'info.main',
                  '&:hover': { cursor: 'pointer' },
                }}
              >
                {' '}
                {'Sign Up'}
              </Link>
            </Typography>
          </Stack>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Login;
