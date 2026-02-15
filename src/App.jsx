import Navbar from './components/Navbar';
import './App.css';
import AppRouter from './router/AppRouter';
import  MovieProvider  from './context/MovieProvider';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
      <MovieProvider>
        <AppRouter />
        <ToastContainer position="top-center" autoClose={2000} />
      </MovieProvider>
    </>
  );
}

export default App;
