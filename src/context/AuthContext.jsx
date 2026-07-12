import { createContext, useEffect } from 'react';
import { auth } from '../auth/firebase';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { useState } from 'react';
import { toastError, toastSuccess, toastWarn } from '../helpers/ToastNotify';
import { useNavigate } from 'react-router-dom';

//!context alani actik
export const AuthKontext = createContext();

const AuthContext = ({ children }) => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);

  //!bu sayfaya ister login ister register ister google için gelin, sadece bir seferliğine user kontrolü yapan fonksiyonu çalıştır

  useEffect(() => {
    userTakip();
  }, []);

  //!register için (sitede zincir yapılı fetch işlemi var biz burada async await i tercih ettik)
  const createUser = async (email, password, displayName) => {
    try {
      // 1 Kullanıcı oluştur
      await createUserWithEmailAndPassword(auth, email, password);

      toastSuccess('Registered Successfully');
      navigate('/');

      //? USERTAKİPTEN SONRA -----kullanıcı profilini güncellemek için kullanılan firebase metodu, login logout da userTakip sayesinde güncelleniyor ama register da isim güncellemesi yok, o da bu şekilde oluyor.alttakini yazmazsam (register ile girdiğimde) navbarda displayName i göremem. alttakini yazmazsam sadece google ile girersem görürüm

      await updateProfile(auth.currentUser, { displayName: displayName });
    } catch (error) {
      toastError(error.message);
    }
  };

  //!login

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toastSuccess('Logged in Successfully');
    } catch (error) {
      toastError(error.message);
      throw error;
    }
  };

  //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu. bir kere çalıştır login logout takip eder.login ile bilgiler gelir bizde burada currentUser ın içine atarız, signout olunca bilgiler gider bizde currentUser ın içini güncelleriz (register ve logindeki email vs ye navbardan ulaşabilmek için). google ile giriş yapınca user ile displayname gelir ama email ile girecekseniz en üstte update kodunu firebase den çağırmalısınız.(userObserver)
  const userTakip = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL } = user;

        setCurrentUser({
          uid: user.uid,
          email: email,
          displayName: displayName,
          photoURL: photoURL,
        });
      } else {
        setCurrentUser(null);
      }
    });
  };

  const Logout = async () => {
    try {
      await signOut(auth);
      toastSuccess('Logged out');
      navigate('/');
    } catch (err) {
      toastError(err.message);
    }
  };

  //!google ile giriş

  //* https://firebase.google.com/docs/auth/web/google-signin?hl=tr

  const signUpGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      toastSuccess('With Google Logged in Successfully');
      navigate('/');
    } catch (error) {
      toastError(error.message);
      throw error;
    }
  };

  //! email yoluyla şifre sıfırlayan firebase metodu
  const forgotPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toastWarn('Please check your email');
      })
      .catch((error) => {
        toastError(error.message);
      });
  };

  return (
    <AuthKontext.Provider
      value={{
        currentUser,
        createUser,
        signIn,
        Logout,
        signUpGoogle,
        forgotPassword,
      }}
    >
      {children}
    </AuthKontext.Provider>
  );
};

export default AuthContext;
