import Navbar from './components/Navbar';
import './App.css';
import AppRouter from './router/AppRouter';
import MovieProvider from './context/MovieProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './context/AuthProvider';

function App() {
  return (
    <>
      <AuthProvider>
        <MovieProvider>
          <AppRouter />
          <ToastContainer position="top-right" autoClose={2000} />
        </MovieProvider>
      </AuthProvider>
    </>
  );
}

export default App;
