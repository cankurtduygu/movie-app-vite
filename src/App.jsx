import Navbar from './components/Navbar';
import './App.css';
import AppRouter from './router/AppRouter';
import  MovieProvider  from './context/MovieProvider';

function App() {
  return (
    <>
      <MovieProvider>
        <AppRouter />
      </MovieProvider>
    </>
  );
}

export default App;
