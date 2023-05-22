import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Categories from './Components/Categories';
import Products from './Components/Products';

const theme = createTheme({
  palette: {
    primary: {
      light: '#fafafa',
      main: '#f5f5f5',
      dark: '#eeeeee',
      contrastText: '#000',
    },
    secondary: {
      light: '#ffeab0',
      main: '#ffd147',
      dark: '#ff9a00',
      contrastText: '#000',
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
