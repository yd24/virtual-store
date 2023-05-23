import { useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

function Products() {
  const visible = useSelector(state => state.products.visibleProducts);
  const activeCat = useSelector(state => state.categories.activeCategory);

  return (
    <>
      <Typography variant="h3" component='h1' textAlign='center' mt={5} mb={5}>
        {activeCat ? `All Products in ${activeCat}` : `All Products`}
      </Typography>
      <Grid container spacing={2} px={3} sx={{justifyContent: 'center'}}>
          {visible.map((product, idx) =>
            <Grid key={idx} item >
              <Card sx={{width: "400px", minHeight: "200px"}}>
                <CardContent>
                  <CardMedia
                    sx={{width: "400px"}}
                    image='https://placehold.co/400x100/'
                    title='Placeholder'
                  />
                  <Typography variant="h6" mb={1}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" sx={{minHeight: '50px'}}>
                    {product.description}
                  </Typography>
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}} mt={5}>
                    <Typography variant='subtitle1'>
                      {`$${product.price}.00`}
                    </Typography>
                    <Typography variant='subtitle1'>
                      {`${product.inStock} units in-stock`}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
      </Grid>
    </>
  );
}

export default Products;