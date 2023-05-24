import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../../Store/cartSlice';
import { incrementProduct } from '../../../Store/productSlice';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Cart() {
  const [cartAnchor, setCartAnchor] = React.useState(null);
  const open = Boolean(cartAnchor);

  const cartItems = useSelector(state => state.cart.cartItems);
  const cartSize = useSelector(state => state.cart.totalCount);
  const dispatch = useDispatch();

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
    </> 
  );
}

export default Cart;