import { Link } from "react-router-dom";
import bgLogin from '../assets/bg-login.jpg';
import { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebase";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // Burada Firebase Authentication ile giriş işlemi yapılacak
    // Örneğin:
    // signInWithEmailAndPassword(auth, loginEmail, loginPassword)  
    try {

      const isimisim = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      toast.success("Login successful!");
      navigate("/");
      
    } catch (error) {
      
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4"
      style={{
              backgroundImage: `url(${bgLogin})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            >
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-3xl p-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Log in to manage your favorites and watchlist.
          </p>

          <form className="mt-8 space-y-5"
                onSubmit={handleLoginSubmit}
          >
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
                onChange={(e) => setLoginEmail(e.target.value)}
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
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500">At least 6 characters</span>
                <button
                  type="button"
                  className="text-xs font-semibold text-emerald-700 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white
                         bg-gradient-to-r from-emerald-600 to-teal-500
                         hover:from-emerald-700 hover:to-teal-600
                         shadow-lg hover:shadow-xl transition"
            >
              Login
            </button>

            <p className="text-sm text-gray-600 text-center">
              Don’t have an account?{" "}
              <Link to="/signup" className="font-semibold text-emerald-700 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
