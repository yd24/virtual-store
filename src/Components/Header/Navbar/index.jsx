import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Categories from '../../Categories';

import { useDispatch } from 'react-redux';
import { setActiveCategory } from '../../../Store/productSlice';

export default function ButtonAppBar() {
  const [show, toggleShow] = React.useState(false);
  const dispatch = useDispatch();
  
  const resetProducts = () => {
    dispatch(setActiveCategory);
  };

  const handleToggle = () => {
    toggleShow(!show);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position="static">
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
            <Link href='/' onClick={resetProducts} color='inherit' sx={{textDecoration: 'none'}}>
              OUR STORE
            </Link>
          </Typography>
          <Button color="inherit">Cart</Button>
        </Toolbar>
      </AppBar>
      <Categories show={show} />
    </Box>
  );
}