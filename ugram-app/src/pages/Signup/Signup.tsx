import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  Card,
  CardActions,
  Container,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import {
  Alert,
  Button,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  TextField,
} from '@mui/material';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';

import { AuthContext } from '../../components/AuthContext/AuthContext';
import client from '../../modules/axios-client';
import { registerUser } from '../../services/user.service.';
import { UserRegister } from '../../types/User';

function Signup() {
  const { login } = useContext(AuthContext);
  const [openAlert, setOpenAlert] = useState(false);
  const [signupError, setSignupError] = useState<string>();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    username: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters')
      .test('username', 'Username is already taken', async (value) => {
        if (value) {
          const response = await client.get(
            '/search/profiles?username=' + value + '&limit=1',
          );
          return response.data.length === 0;
        }
        return true;
      }),
    phoneNumber: Yup.string()
      .required('Phone is required')
      .matches(/^[0-9]+$/, 'Phone must be only digits')
      .min(10, 'Phone must be at least 10 digits')
      .max(10, 'Phone must not exceed 10 digits'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/(?=.*[0-9])/, 'Password must contain a number')
      .matches(/(?=.*[a-z])/, 'Password must contain a lowercase letter')
      .matches(/(?=.*[A-Z])/, 'Password must contain an uppercase letter')
      .matches(/(?=.*[!@#$%^&*])/, 'Password must contain a special character')
      .required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegister>({
    resolver: yupResolver(validationSchema),
    criteriaMode: 'all',
    mode: 'onBlur',
  });

  const onSubmit = (userRegister: UserRegister) => {
    registerUser(userRegister)
      .then(async () => {
        await login({
          email: userRegister.email,
          password: userRegister.password,
        });
      })
      .catch((error) => {
        switch (error.response.status) {
          case 500:
            setSignupError('Internal server error');
            setOpenAlert(true);
            break;
          default:
            setSignupError(error.response.data.message);
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
            {'Create your ugram account'}
          </Typography>
        </Stack>

        <CardContent component="form">
          <TextField
            {...register('name')}
            required
            id="name"
            label="Name"
            fullWidth
            margin="dense"
            color="secondary"
            autoComplete="current-name"
            error={errors.name ? true : false}
            helperText={errors.name?.message}
          />

          <TextField
            {...register('username')}
            required
            id="username"
            label="Username"
            fullWidth
            margin="dense"
            color="secondary"
            autoComplete="current-username"
            error={errors.username ? true : false}
            helperText={errors.username?.message}
          />

          <TextField
            {...register('phoneNumber')}
            required
            id="phoneNumber"
            label="Phone Number"
            fullWidth
            margin="dense"
            color="secondary"
            autoComplete="current-phoneNumber"
            error={errors.phoneNumber ? true : false}
            helperText={errors.phoneNumber?.message}
          />

          <TextField
            {...register('email')}
            required
            id="email"
            label="Email"
            type="email"
            fullWidth
            margin="dense"
            color="secondary"
            autoComplete="current-email"
            error={errors.email ? true : false}
            helperText={errors.email?.message}
          />

          <TextField
            {...register('password')}
            required
            id="password"
            type="password"
            label="Password"
            fullWidth
            margin="dense"
            color="secondary"
            autoComplete="current-password"
            error={errors.password ? true : false}
            helperText={errors.password?.message}
          />

          <Divider sx={{ width: '100%', mt: 2, mb: 2 }} />
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
              {signupError}
            </Alert>
          </Collapse>

          <Button
            fullWidth
            variant="contained"
            color="info"
            type="submit"
            sx={{
              mt: 2,
              height: 50,
              fontSize: 18,
            }}
            onClick={handleSubmit(onSubmit)}
          >
            {'Create account'}
          </Button>
        </CardContent>
        <CardActions sx={{ flexDirection: 'column', padding: 0 }}>
          <Typography mt={3} color="text.secondary" align="center">
            {'Already have an account ? '}{' '}
            <Link
              component={RouterLink}
              underline="hover"
              to="/login"
              sx={{ marginTop: 2, color: 'info.main', '&:hover': { cursor: 'pointer' } }}
            >
              {' '}
              {'Sign In'}
            </Link>
          </Typography>
        </CardActions>
      </Card>
    </Container>
  );
}

export default Signup;
