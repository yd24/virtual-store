import { useSelector, useDispatch } from 'react-redux';
import { setActiveCategory } from '../../Store/categorySlice';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';

function Categories(props) {
  const categories = useSelector(state => state.categories.allCategories);
  const dispatch = useDispatch();

  const setActiveCat = (e) => {
    if (document.querySelector('.selected')) {
      document.querySelector('.selected').classList.remove('selected');
    }
    e.currentTarget.classList.add('selected');
    dispatch(setActiveCategory(e.currentTarget.textContent));
  };

  return (
    <Collapse sx={{padding: '1em 5em 3em 5em', backgroundColor: 'white', width: '100vw', position: 'fixed'}}in={props.show}>
      <List sx={{padding: '0 2em'}}
        subheader={
          <ListSubheader>Categories</ListSubheader>
        }
      >
        {categories.map((category, idx) => 
          <ListItem sx={{cursor: 'pointer'}} onClick={setActiveCat} key={idx} value={category}>
            {category}
          </ListItem>
        )}
      </List>
    </Collapse>
  );
}

export default Categories;