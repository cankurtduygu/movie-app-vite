import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MovieKontext } from '../context/MovieContext';
import { AuthKontext } from '../context/AuthContext';

const Profile = () => {
  const { favorites } = useContext(MovieKontext);

  const { currentUser } = useContext(AuthKontext);

  // console.log(favorites);

  const letter =
    currentUser?.displayName?.charAt(0)?.toUpperCase() ||
    currentUser?.email?.charAt(0)?.toUpperCase() ||
    '?';

  return (
    <div className="min-h-[calc(100vh-80px)] px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-3xl p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-4 sm:gap-5 min-w-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-center text-xl sm:text-2xl font-bold shadow-lg">
                {letter}
              </div>

              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                  {currentUser?.displayName || 'User'}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base break-all">
                  {currentUser?.email}
                </p>
              </div>
            </div>

            <Link
              to="/favorites"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-white text-sm sm:text-base
                         bg-linear-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600
                         shadow-lg hover:shadow-xl transition"
            >
              Go to Favorites
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Favorites</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {favorites?.length ?? 0}
              </p>
              <p className="text-sm text-gray-500 mt-2">Movies you’ve saved</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Watchlist</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
              <p className="text-sm text-gray-500 mt-2">
                Movies to watch later
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto px-5 py-3 rounded-xl font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 transition text-center"
            >
              Back to Home
            </Link>

            <Link
              to="/favorites"
              className="w-full sm:w-auto px-5 py-3 rounded-xl font-semibold text-white
                         bg-linear-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600
                         shadow-lg hover:shadow-xl transition text-center"
            >
              View Favorites
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
