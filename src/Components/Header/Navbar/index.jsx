import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Categories from '../../Categories';
import Cart from '../Cart';

export default function ButtonAppBar() {
  const [show, toggleShow] = React.useState(false);

  const handleToggle = () => {
    toggleShow(!show);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position="fixed" sx={{padding: '0.2em', backgroundColor: 'primary.light'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href='/' color='inherit' sx={{textDecoration: 'none'}}>
              OUR STORE
            </Link>
          </Typography>
          <Cart />
        </Toolbar>
        <Categories show={show} handleToggle={handleToggle} />
      </AppBar>
    </Box>
  );
}