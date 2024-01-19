import {
  AccountBox as AccountBoxSelectedIcon,
  AccountBoxOutlined as AccountBoxIcon,
  AddBox as AddBoxSelectedIcon,
  AddBoxOutlined as AddBoxIcon,
  Group as GroupSelectedIcon,
  GroupOutlined as GroupIcon,
  Home as HomeSelectedIcon,
  HomeOutlined as HomeIcon,
  Logout as LogoutSelectedIcon,
  LogoutOutlined as LogoutIcon,
  Search as SearchSelectedIcon,
  SearchOutlined as SearchIcon,
} from '@mui/icons-material';
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../AuthContext/AuthContext';
import { appBarHeight, drawerFullWidth, drawerWidth } from '../Layout/ResponsiveLayout';
import AddPostDialog from '../Post/AddPostDialog';
import AnimatedLogo from './AnimatedLogo';

type NavMenuItem = {
  label: string;
  icon: JSX.Element;
  selectedIcon?: JSX.Element;
  navigateTo: string;
};

type NavMenuProps = {
  isMobile: boolean;
  openSearch: boolean;
  setOpenSearch: (open: boolean) => void;
};

export default function NavMenu({ isMobile, openSearch, setOpenSearch }: NavMenuProps) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [openAddPostDialog, setOpenAddPostDialog] = useState(false);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);

  let menuItems: NavMenuItem[] = [
    {
      label: 'Home',
      icon: <HomeIcon />,
      selectedIcon: <HomeSelectedIcon />,
      navigateTo: '/',
    },
    {
      label: 'Search',
      icon: <SearchIcon />,
      selectedIcon: <SearchSelectedIcon />,
      navigateTo: '/search',
    },
    {
      label: 'Users',
      icon: <GroupIcon />,
      selectedIcon: <GroupSelectedIcon />,
      navigateTo: '/users',
    },
    {
      label: 'Add',
      icon: <AddBoxIcon />,
      selectedIcon: <AddBoxSelectedIcon />,
      navigateTo: '/add',
    },
    {
      label: 'Profile',
      icon: <AccountBoxIcon />,
      selectedIcon: <AccountBoxSelectedIcon />,
      navigateTo: '/users/' + user?.userId,
    },
    {
      label: 'Logout',
      icon: <LogoutIcon />,
      selectedIcon: <LogoutSelectedIcon />,
      navigateTo: '/logout',
    },
  ];

  if (isMobile) {
    menuItems = menuItems.filter((item) => item.label !== 'Search');
  }

  const handleNavMenuItemClick = (index: number, label: string, navigateTo: string) => {
    switch (label) {
      case 'Add':
        setOpenAddPostDialog(true);
        break;
      case 'Search':
        setOpenSearch(true);
        break;
      default:
        setSelectedMenuIndex(index);
        navigate(navigateTo, { replace: true });
        break;
    }
  };

  return (
    <Box
      sx={{
        height: { xs: appBarHeight, sm: '100vh' },
        width: {
          xs: '100%',
          sm: drawerWidth,
          md: `${openSearch ? drawerWidth : drawerFullWidth}px`,
        },
        display: 'flex',
        overflow: { xs: 'scrollable', sm: 'hidden' },
        transition: 'width 0.3s ease-in-out',
      }}
    >
      <AddPostDialog
        open={openAddPostDialog}
        onClose={() => {
          setOpenAddPostDialog(false);
        }}
      />
      <List
        sx={{
          width: '100%',
        }}
      >
        {!isMobile ? <AnimatedLogo isOpen={openSearch} /> : null}
        {menuItems.map(({ label, icon, navigateTo }, index) => (
          <ListItemButton
            key={index}
            onClick={() => handleNavMenuItemClick(index, label, navigateTo)}
            selected={selectedMenuIndex === index}
            sx={{
              border: `${index === 1 && openSearch ? '1px solid' : 'none'}`,
            }}
          >
            {isMobile ? (
              <ListItemIcon>
                {index === 2 && openAddPostDialog ? (
                  <AddBoxSelectedIcon />
                ) : index === 2 && !openAddPostDialog ? (
                  <AddBoxIcon />
                ) : index === 4 ? (
                  <LogoutIcon />
                ) : selectedMenuIndex === index ? (
                  menuItems[index].selectedIcon
                ) : (
                  menuItems[index].icon
                )}
              </ListItemIcon>
            ) : (
              <ListItemIcon>
                {index === 1 && openSearch ? (
                  <SearchSelectedIcon />
                ) : index === 1 && !openSearch ? (
                  <SearchIcon />
                ) : index === 3 && openAddPostDialog ? (
                  <AddBoxSelectedIcon />
                ) : index === 3 && !openAddPostDialog ? (
                  <AddBoxIcon />
                ) : index === 5 ? (
                  <LogoutIcon />
                ) : selectedMenuIndex === index ? (
                  menuItems[index].selectedIcon
                ) : (
                  menuItems[index].icon
                )}
              </ListItemIcon>
            )}
            <ListItemText
              sx={{
                display: { xs: 'none', md: `${openSearch ? 'none' : 'block'}` },
                minWidth: {
                  xs: '0px',
                  md: `${openSearch ? 0 : drawerFullWidth * 0.4}px`,
                },
              }}
              primary={label}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
