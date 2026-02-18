import { createContext, useEffect } from 'react';
import { auth } from '../auth/firebase';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { useState } from 'react';
import { toast } from 'react-toastify';



export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const createUser = async (email, password, username) => {
    try {
      // 1 Kullanıcı oluştur
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 2️ Username'i profile'a kaydet
      await updateProfile(user, {
        displayName: username,
      });

      //   // 3️ Form temizle
      //   setEmail('');
      //   setPassword('');
      //   setUsername('');

      // 4️ Toast
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const Logout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, createUser, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
