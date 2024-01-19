import { ListItemButton, ListItemIcon, SvgIcon, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

import { ReactComponent as SmallLogo } from '../../../public/logo.svg';
import { ReactComponent as Logo } from '../../../public/logo-name.svg';
import appTheme from '../../styles/theme';
import { drawerFullWidth } from '../Layout/ResponsiveLayout';

const logoHeight = '4rem';

type AnimatedLogoProps = {
  isOpen: boolean;
};

function AnimatedLogo({ isOpen }: AnimatedLogoProps) {
  const sm = useMediaQuery(appTheme.breakpoints.down('md'));
  const md = useMediaQuery(appTheme.breakpoints.up('md'));

  return (
    <>
      {(sm || (md && isOpen)) && (
        <ListItemButton
          component={motion.div}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          sx={{
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <ListItemIcon>
            <SvgIcon
              component={SmallLogo}
              viewBox="-60 -60 600 600"
              sx={{
                height: logoHeight,
              }}
            />
          </ListItemIcon>
        </ListItemButton>
      )}

      {md && !isOpen && (
        <ListItemButton
          component={motion.div}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          disableRipple
          sx={{
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <ListItemIcon>
            <SvgIcon
              component={Logo}
              viewBox="185 -90 400 350"
              sx={{
                width: drawerFullWidth * 0.6,
                height: logoHeight,
              }}
            />
          </ListItemIcon>
        </ListItemButton>
      )}
    </>
  );
}

export default AnimatedLogo;
