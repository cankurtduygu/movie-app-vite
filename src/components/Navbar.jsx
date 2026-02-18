import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";


const Navbar = () => {
  const { user, Logout } = useContext(AuthContext);

  const handleLogout = async () => {
    Logout();
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent tracking-wider hover:scale-105 transition-transform duration-300"
        >
          CINEPLAX
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Profile Avatar */}
              <Link to="/profile">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-center font-semibold shadow-lg hover:scale-110 transition-all duration-300">
                  {user?.displayName
                    ? user.displayName.charAt(0).toUpperCase()
                    : user.email.charAt(0).toUpperCase()}
                </div>
              </Link>

              {/* Sign Out */}
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/50 transform hover:scale-105"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/50 transform hover:scale-105"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/50 transform hover:scale-105"
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
