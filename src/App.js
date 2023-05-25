import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Categories from './Components/Categories';
import Products from './Components/Products';

const theme = createTheme({
  palette: {
    primary: {
      light: '#fff',
      main: '#f0f0f0',
      dark: '#545454',
      contrastText: '#414139',
    },
    secondary: {
      light: '#d2d049',
      main: '#c9a218',
      dark: '#c06800',
      contrastText: '#414139',
    },
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Categories />
      <Products />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
