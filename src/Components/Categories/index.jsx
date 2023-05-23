import { useSelector, useDispatch } from 'react-redux';
import { setActiveCategory } from '../../Store/categorySlice';
import { setActiveCategory as setProducts } from '../../Store/productSlice';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';

function Categories(props) {
  const categories = useSelector(state => state.categories.allCategories);
  const dispatch = useDispatch();

  const setActiveCat = (e) => {
    dispatch(setActiveCategory(e.currentTarget.textContent));
  };

  return (
    <Collapse in={props.show}>
      <List
        subheader={
          <ListSubheader>Categories</ListSubheader>
        }
      >
        {categories.map((category, idx) => 
          <ListItemButton onClick={setActiveCat} key={idx} value={category}>{category}</ListItemButton>  
        )}
      </List>
    </Collapse>
  );
}

export default Categories;