import { useSelector, useDispatch } from 'react-redux';
import { setActiveCategory } from '../../Store/productSlice';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

function Products() {
  const visible = useSelector(state => state.products.visibleProducts);
  const activeCat = useSelector(state => state.categories.activeCategory);

  return (
    <>
      <Typography variant="h2" component='h1' textAlign='center' mt={4} mb={4}>
        {activeCat ? `All Products in ${activeCat}` : `All Products`}
      </Typography>
      <Grid container spacing={2} px={3} sx={{justifyContent: 'center'}}>
          {visible.map((product, idx) =>
            <Grid key={idx} item >
              <Card sx={{minWidth: "300px", minHeight: "200px"}}>
                <CardContent>
                  <Typography variant="h6" mb={1}>
                    {product.name}
                  </Typography>
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant='subtitle1'>
                      {`$${product.price}.00`}
                    </Typography>
                    <Typography variant='subtitle1'>
                      {`${product.inStock} units in-stock`}
                    </Typography>
                  </Box>
                  <Typography variant="body2" mt={5}>
                    {product.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
      </Grid>
    </>
  );
}

export default Products;