import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../../Store/cartSlice';
import { incrementProduct } from '../../../Store/productSlice';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

function Cart() {
  const [cartAnchor, setCartAnchor] = React.useState(null);
  const open = Boolean(cartAnchor);

  const cartItems = useSelector(state => state.cart.cartItems);
  const cartSize = useSelector(state => state.cart.totalCount);
  const cartTotal = useSelector(state => state.cart.totalPrice);
  const dispatch = useDispatch();

  const handleCartClick = (e) => {
    setCartAnchor(e.currentTarget);
  }

  const handleCartClose = () => {
    setCartAnchor(null);
  }

  const removeFromCart = (product) => {
    dispatch(removeItem(product));
    dispatch(incrementProduct(product));
  }

  return (
    <>
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
          <MenuItem key={idx} sx={{justifyContent: 'space-between', width: '300px', padding: '2em', alignItems: 'flex-start'}}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
              {item.product.name}
              <Typography variant='subtitle2' sx={{color: '#3b3b3b', display: 'flex', justifyContent: 'flex-start'}}>{`Quantity: ${item.count}`}</Typography>
            </Box>
            <Typography sx={{padding: '0 0.5em'}} onClick={() => removeFromCart(item)}>X</Typography>
          </MenuItem>
        )
        :
        <MenuItem sx={{width: '300px', padding: '2em'}}>
          Cart is Empty.
        </MenuItem>
        }
        <Divider />
        <MenuItem sx={{justifyContent: 'space-between', fontWeight: 'bold'}}>
          <Typography sx={{color: 'secondary.dark'}}>View Cart</Typography>
          Total: ${cartTotal}.00
        </MenuItem>
      </Menu>
    </> 
  );
}

export default Cart;