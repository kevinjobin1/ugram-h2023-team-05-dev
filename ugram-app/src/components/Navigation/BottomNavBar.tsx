import { styled } from '@mui/material';
import Drawer from '@mui/material/Drawer';

import NavMenu from './NavMenu';

const BottomDrawer = styled(Drawer)({
  height: 60,
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: '100%',
  },
  '& .MuiList-root': {
    padding: 0.5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  '& .MuiListItem-root': {
    width: '20%',
    '& .MuiListItemButton-root': {
      borderRadius: 0,
      padding: 0,
      justifyContent: 'center',
      '&:hover': {
        '& .MuiListItemIcon-root': {
          transform: 'scale(1.1)',
          ease: 'ease-in',
          easeDuration: '0.3s',
        },
      },
    },
  },
  '& .MuiListItemIcon-root': {
    minWidth: 'auto',
    '& .MuiSvgIcon-root': {
      fontSize: '2rem',
    },
  },
}) as typeof Drawer;

const BottomNavBar: React.FC = () => {
  return (
    <BottomDrawer
      variant="permanent"
      anchor="bottom"
      ModalProps={{
        keepMounted: true,
      }}
    >
      <NavMenu
        isMobile={true}
        openSearch={false}
        setOpenSearch={() => {
          // do nothing
        }}
      />
    </BottomDrawer>
  );
};

export default BottomNavBar;
