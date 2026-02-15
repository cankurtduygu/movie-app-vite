import { Link } from 'react-router-dom';



const Navbar = () => {


  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-3 hover:opacity-90 transition-all duration-300 group"
        >
          <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent tracking-wider group-hover:scale-110 transition-transform duration-300">
            CINEPLAX
          </div>
        </Link>

        <div className="flex justify-end items-center space-x-3 sm:space-x-4">
          <Link
            to="/login"
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/50 transform hover:scale-105 text-sm sm:text-base"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/50 transform hover:scale-105 text-sm sm:text-base"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
