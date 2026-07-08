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

//context alani actik
export const AuthKontext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const createUser = async (email, password, displayName) => {
    try {
      // 1 Kullanıcı oluştur
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2️ DisplayName'i profile'a kaydet
      await updateProfile(userCredential.user, {
        displayName: displayName,
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
    <AuthKontext.Provider value={{ user, createUser, Logout }}>
      {children}
    </AuthKontext.Provider>
  );
};

export default AuthContext;
