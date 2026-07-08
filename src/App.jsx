import Navbar from './components/Navbar';
import './App.css';
import AppRouter from './router/AppRouter';
import MovieProvider from './context/MovieProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from './context/AuthContext';

function App() {
  return (
    <>
      <AuthContext>
        <MovieProvider>
          <AppRouter />
          <ToastContainer position="top-right" autoClose={2000} />
        </MovieProvider>
      </AuthContext>
    </>
  );
}

export default App;
