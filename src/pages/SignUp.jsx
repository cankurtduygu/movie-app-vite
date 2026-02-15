import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/bg-signUp.jpg";

const SignUp = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 "
         style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-3xl p-8">
          <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Sign up to save favorites and build your watchlist.
          </p>

          <form className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="e.g. duygu93"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
                           focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400
                           transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
                           focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400
                           transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
                           focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400
                           transition"
              />
              <p className="text-xs text-gray-500 mt-2">
                Use at least 6 characters.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white
                         bg-gradient-to-r from-emerald-600 to-teal-500
                         hover:from-emerald-700 hover:to-teal-600
                         shadow-lg hover:shadow-xl transition"
            >
              Sign Up
            </button>

            <p className="text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-emerald-700 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
