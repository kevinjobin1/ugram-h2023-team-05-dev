import { green } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const appTheme = createTheme({
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  palette: {
    common: {
      black: '#020202',
      white: '#fafafa',
    },
    primary: {
      main: '#ef0155',
      light: '#ff4a7d',
      dark: '#b2003a',
      contrastText: '#fafafa',
    },
    secondary: {
      main: '#a8a8a8',
      light: '#d5d5d5',
      dark: '#323232',
      contrastText: '#fafafa',
    },
    background: {
      default: '#020202', // '#242424', //'#121212', //'#888888', //'#020202', // '#262626',
      paper: '#262626',
    },
    error: {
      main: '#FF3040',
      light: '#FF5F6D',
      dark: '#FF0000',
      contrastText: '#fafafa',
    },
    success: {
      main: green.A400,
      light: green.A100,
      dark: green.A700,
      contrastText: '#fafafa',
    },
    info: {
      main: '#0080FF',
      light: '#0095F6',
      dark: '#185ADB',
      contrastText: '#fafafa',
    },
    text: {
      primary: '#fafafa',
      secondary: '#737373',
    },
    grey: {
      50: '#f8f8f8',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#a8a8a8',
      600: '#737373',
      700: '#424242',
      800: '#262626',
      900: '#121212',
      A100: '#d5d5d5',
      A200: '#aaaaaa',
      A400: '#303030',
      A700: '#616161',
    },

    divider: '#242424',
  },

  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#020202',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          height: '50px',
          '&:disabled': {
            backgroundColor: '#121212',
            color: '#424242',
          },
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          marginLeft: '1rem',
          marginRight: '1rem',
          marginTop: '0.3rem',
          marginBottom: '0.3rem',
          padding: '0.5rem',
          justifyContent: 'center',
          '&.Mui-selected': {
            backgroundColor: 'transparent',
            '& .MuiListItemText-root': {
              '& .MuiTypography-root': {
                fontWeight: 'bolder',
              },
            },
            '&:hover': {
              backgroundColor: '#121212',
            },
          },
          '&:hover': {
            backgroundColor: '#121212',
          },
          '& .MuiListItemIcon-root': {
            color: '#fafafa',
            minWidth: 'auto',

            '& .MuiSvgIcon-root': {
              fontSize: '2rem',
            },
          },
        },
      },
    },

    MuiListItemText: {
      styleOverrides: {
        root: {
          marginLeft: '1rem',
          marginTop: '0.3rem',
          marginBottom: '0.3rem',
          color: '#fafafa',
          '& .MuiTypography-root': {
            fontSize: '1rem',
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#020202',
          border: '1px solid #424242',
        },
      },
    },

    MuiCardHeader: {
      styleOverrides: {
        root: {
          backgroundColor: '#020202',
          borderBottom: '1px solid #424242',
        },
      },
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
          backgroundColor: '#020202',
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root:hover': {
            '& > fieldset': {
              borderColor: '#a8a8a8',
            },
          },
          '& .MuiOutlinedInput-root.Mui-focused': {
            '& > fieldset': {
              borderColor: '#0095F6', // '#1877F2', // '#ef0155',
            },
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          backgroundColor: '#020202',
          fontSize: '1rem',
          color: '#fafafa',
          '&.Mui-focused': {
            color: '#0095F6', // '#1877F2', // '#ef0155',
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '3px',
          border: '1px solid #424242',
          '&:hover': {
            border: '1px solid transparent',
          },
          '&.Mui-focused': {
            border: '1px solid transparent',
          },
        },

        input: {
          '&::placeholder': {
            textOverflow: 'ellipsis !important',
            color: '#fafafa',
          },
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px #020202 inset',
            WebkitTextFillColor: '#fafafa',
          },
        },
      },
    },
  },
});

export default appTheme;
