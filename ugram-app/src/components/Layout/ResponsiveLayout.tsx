import { Box, CssBaseline, useMediaQuery } from '@mui/material';

import appTheme from '../../styles/theme';
import AppBarTop from '../Navigation/AppBarTop';
import BottomNavBar from '../Navigation/BottomNavBar';
import SideNavBar from '../Navigation/SideNavBar';

export const drawerWidth = 80 as const;
export const drawerFullWidth = 240 as const;
export const appBarHeight = 60 as const;

export default function ResponsiveLayout({ children }: any) {
  const isXs = useMediaQuery(appTheme.breakpoints.only('xs'));
  const isSmUp = useMediaQuery(appTheme.breakpoints.up('sm'));
  return (
    <Box
      component="div"
      sx={{
        display: { xs: 'block', sm: 'flex' },
        width: '100%',
      }}
    >
      <CssBaseline />
      {isXs && <AppBarTop />}
      {isSmUp && (
        <Box
          sx={{
            width: { sm: drawerWidth, md: drawerFullWidth },
          }}
        >
          <SideNavBar />
        </Box>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            sm: `calc(100% - ${drawerWidth}px)`,
            md: `calc(100% - ${drawerFullWidth}px)`,
          },
          height: { xs: `calc(90% - ${2 * appBarHeight}px)`, sm: '100%' },
          mb: 2,
        }}
      >
        {children}
      </Box>
      {isXs && <BottomNavBar />}
    </Box>
  );
}
