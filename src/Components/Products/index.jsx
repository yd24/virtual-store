import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../Store/cartSlice';
import { decrementProduct } from '../../Store/productSlice';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Products() {
  const visible = useSelector(state => state.products.visibleProducts);
  const activeCat = useSelector(state => state.categories.activeCategory);
  const dispatch = useDispatch();

  const addProduct = (product, key) => {
    let item = {
      name: product,
      id: `${product}-${key}`,
      count: 1,
    };
    dispatch(addItem(item, key));
    dispatch(decrementProduct(product));
  };

  return (
    <>
      <Typography variant="h3" component='h1' textAlign='center' mt={5} mb={5}>
        {activeCat ? `All Products in ${activeCat}` : `All Products`}
      </Typography>
      <Grid container spacing={3} px={3} pb={5} sx={{justifyContent: 'center'}}>
          {visible.map((product, idx) =>
            <Grid key={idx} item >
              <Card sx={{width: "300px", minHeight: "200px"}}>
                <CardContent>
                  <CardMedia
                    component="img"
                    image="https://placehold.co/200x300/"
                    title="Placeholder"
                  />
                  <Typography variant="h6" mt={3} mb={1}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" sx={{minHeight: '50px'}}>
                    {product.description}
                  </Typography>
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}} mt={5} mb={3}>
                    <Typography variant='subtitle1' sx={{fontWeight: 'bold'}}>
                      {`$${product.price}.00`}
                    </Typography>
                    <Typography variant='subtitle1'>
                      {product.inStock > 0 ? `${product.inStock} in-stock` : `Out of stock`}
                    </Typography>
                  </Box>
                  {product.inStock > 0
                  &&
                    <Button sx={{padding: 0, color: 'secondary.dark'}} onClick={() => { addProduct(product.name, idx)}}>Add to Cart</Button>
                  }
                </CardContent>
              </Card>
            </Grid>
          )}
      </Grid>
    </>
  );
}

export default Products;