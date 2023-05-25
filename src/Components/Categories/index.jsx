import { useSelector, useDispatch } from 'react-redux';
import { setActiveCategory, fetchCategories } from '../../Store/categorySlice';
import { useEffect } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

function Categories(props) {
  const categories = useSelector(state => state.categories.allCategories);
  const dispatch = useDispatch();

  const setActiveCat = (e) => {
    toggleSelect(e);
    dispatch(setActiveCategory(e.currentTarget.textContent.toLowerCase()));
    props.handleToggle();
  };

  const resetCat = (e) => {
    toggleSelect(e);
    dispatch(setActiveCategory(null));
    props.handleToggle();
  }

  const toggleSelect = (e) => {
    if (document.querySelector('.selected')) {
      document.querySelector('.selected').classList.remove('selected');
    }
    e.currentTarget.classList.add('selected');
  }

  useEffect(() => {
    dispatch(fetchCategories());
  });

  return (
    <Collapse sx={{padding: '1em 3em 1em 3em', backgroundColor: 'primary.light', width: '100vw', position: 'fixed'}}in={props.show}>
      <List 
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          '& .selected': {
            color: 'secondary.main'
          },
          '& .MuiList-root': {
            minWidth: '200px'
          },
          '& .MuiListItem-root': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
          }
        }}
      >
        <List>
          <Typography mb={2} sx={{fontSize: '16px'}}component='h3'>Categories</Typography>
          {categories.map((category, idx) => {
            let capitalized = category.name.charAt(0).toUpperCase();
            capitalized = capitalized + category.name.slice(1);
            return (<ListItem 
              sx={{
                cursor: 'pointer',
                fontSize: '14px'
              }} 
              onClick={setActiveCat} 
              key={idx} 
            >
              {capitalized}
            </ListItem>);
          })}
        </List>
        <List>
          <Typography mb={2} sx={{fontSize: '16px'}}component='h3'>Other</Typography>
          <ListItem
            sx={{
              cursor: 'pointer',
              fontSize: '14px'
            }}
            onClick={resetCat}
          >
            All Products
          </ListItem>
        </List>
      </List>
    </Collapse>
  );
}

export default Categories;