import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MenuIcon from '@mui/icons-material/Menu';
import Categories from '../../Categories';

import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from '../../../Store/categorySlice';
import { removeItem } from '../../../Store/cartSlice';
import { incrementProduct } from '../../../Store/productSlice';

export default function ButtonAppBar() {
  const [show, toggleShow] = React.useState(false);
  const [cartAnchor, setCartAnchor] = React.useState(null);
  const open = Boolean(cartAnchor);

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const cartSize = useSelector(state => state.cart.totalCount);
  
  const resetProducts = () => {
    dispatch(setActiveCategory(null));
  };

  const handleToggle = () => {
    toggleShow(!show);
  };

  const handleCartClick = (e) => {
    setCartAnchor(e.currentTarget);
  }

  const handleCartClose = () => {
    setCartAnchor(null);
  }

  const removeFromCart = (item) => {
    dispatch(removeItem(item.id));
    dispatch(incrementProduct(item));
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position="static" sx={{backgroundColor: 'white'}}>
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
          <Button 
            id='cart-button'
            color="inherit"
            aria-controls={open ? 'cart-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleCartClick}
          >
            Cart ({cartSize})
          </Button>
          <Menu 
            id='cart-menu'
            anchorEl={cartAnchor}
            open={open}
            onClose={handleCartClose}
            MenuListProps={{
              'aria-labelledby': 'cart-button',
            }}
          >
            {cartItems.length > 0
            ?
            cartItems.map((item, idx) => 
              <MenuItem key={idx} sx={{display: 'flex', justifyContent: 'space-between', width: '300px', padding: '2em'}}>
                {`${item.name} ${item.count > 1 ? `(${item.count})` : ``}`}
                <span onClick={() => removeFromCart(item)}>X</span>
              </MenuItem>
            )
            :
            <MenuItem sx={{width: '300px', padding: '2em'}}>
              Cart is Empty.
            </MenuItem>
            }
          </Menu>
        </Toolbar>
      </AppBar>
      <Categories show={show} />
    </Box>
  );
}