import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthKontext } from '../context/AuthContext';

const navButtonClass =
  'shrink-0 px-3 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105';

const Navbar = () => {
  const { currentUser, Logout } = useContext(AuthKontext);

  const handleLogout = async () => {
    Logout();
  };

  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-3 min-w-0">
        {/* Logo */}
        <Link
          to="/"
          className="min-w-0 truncate text-2xl sm:text-3xl lg:text-4xl font-black bg-linear-to-r from-red-600 to-red-800 bg-clip-text text-transparent tracking-wide sm:tracking-wider hover:scale-105 transition-transform duration-300"
        >
          CINEPLAX
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {currentUser ? (
            <>
              <Link to="/profile" className="shrink-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-center text-sm sm:text-base font-semibold shadow-lg hover:scale-110 transition-all duration-300">
                  {currentUser?.displayName
                    ? currentUser.displayName.charAt(0).toUpperCase()
                    : currentUser.email.charAt(0).toUpperCase()}
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className={`${navButtonClass} bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white hover:shadow-red-500/50`}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`${navButtonClass} bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white hover:shadow-blue-500/50`}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className={`${navButtonClass} bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white hover:shadow-red-500/50`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
