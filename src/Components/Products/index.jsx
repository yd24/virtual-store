import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../Store/cartSlice';
import { setActiveCategory } from '../../Store/categorySlice';
import { fetchProducts, toggleLoading, removeProductStock } from '../../Store/productSlice';
import { useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

function Products() {
  const visible = useSelector(state => state.products.visibleProducts);
  const activeCat = useSelector(state => state.categories.activeCategory);
  const loading = useSelector(state => state.products.loading);
  const dispatch = useDispatch();

  const addProduct = (product, key) => {
    let item = {
      product: {...product, inStock: product.inStock - 1},
      id: product._id,
      count: 1,
    };
    dispatch(addItem(item));
    dispatch(removeProductStock(item));
  };

  const capitalize = (string) => {
    let capitalized = string.charAt(0).toUpperCase();
    capitalized = capitalized + string.slice(1);
    return capitalized;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps 
  useEffect(() => {
    dispatch(fetchProducts())
    .unwrap()
    .then(() => {
      dispatch(setActiveCategory(activeCat));
      dispatch(toggleLoading(false));
    });
  }, []);

  return (
    <>
      <Typography variant="h3" component='h1' textAlign='center' mt={5} mb={5}>
        {activeCat ? `All Products in ` : `All Products`}
        {activeCat
        &&
        <Box component="span" sx={{color: 'secondary.main'}}>
          {capitalize(activeCat)}
        </Box>
        }
      </Typography>
      {!loading 
      ?
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
                      {`$${product.price.toFixed(2)}`}
                    </Typography>
                    <Typography variant='subtitle1'>
                      {product.inStock > 0 ? `${product.inStock} In-stock` : `Out of stock`}
                    </Typography>
                  </Box>
                  {product.inStock > 0
                  ?
                    <Button sx={{padding: 0, color: 'secondary.dark'}} onClick={() => { addProduct(product, idx)}}>Add to Cart</Button>
                  :
                    <Button sx={{padding: 0, opacity: 0, visibility: 'hidden'}}>Add to Cart</Button>
                  }
                </CardContent>
              </Card>
            </Grid>
          )}
      </Grid>
      :
      <Box>
        <CircularProgress sx={{display: 'block', margin: '0 auto', padding: '5em'}} color="secondary"/>
      </Box>
      }
    </>
  );
}

export default Products;