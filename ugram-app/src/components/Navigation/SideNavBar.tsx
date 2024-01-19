import { Drawer } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SearchResult } from '../../types/Search';
import SearchDrawer from '../Search/SearchDrawer';
import NavMenu from './NavMenu';

export default function SideNavBar() {
  const navigate = useNavigate();

  function onSearchDrawerClose(result?: SearchResult) {
    switch (result?.type) {
      case 'profiles':
        navigate('/users/' + result.id, { replace: true });
        break;
      case 'posts':
        navigate(encodeURI('/pictures?' + 'search=' + result.keyword), {
          replace: true,
        });
        break;
      case 'tags':
        navigate(encodeURI('/pictures?' + 'search=' + result.title.replace('#', '%23')), {
          replace: true,
        });
        break;
      default:
        break;
    }
    setOpenSearchDrawer(false);
  }

  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
        open
      >
        <NavMenu
          isMobile={false}
          openSearch={openSearchDrawer}
          setOpenSearch={setOpenSearchDrawer}
        />
      </Drawer>
      <SearchDrawer open={openSearchDrawer} onClose={onSearchDrawerClose} />
    </>
  );
}
