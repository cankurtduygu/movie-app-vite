import Navbar from './components/Navbar';
import './App.css';
import AppRouter from './router/AppRouter';
import MovieContext from './context/MovieContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from './context/AuthContext';

function App() {
  return (
    <>
      <AuthContext>
        <MovieContext>
          <AppRouter />
          <ToastContainer position="top-right" autoClose={2000} />
        </MovieContext>
      </AuthContext>
    </>
  );
}

export default App;
