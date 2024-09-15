import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  updatePassword,
  sendEmailVerification,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import toast from "react-hot-toast";
import { logout as logoutHandle } from "../store/auth";
import { login as loginHandle } from "../store/auth";
import { store } from "../store";

const firebaseConfig = {
  apiKey: "AIzaSyCx-hQmjbview8TWz2eLYnNzVtJszB2mlc",
  authDomain: "fir-auth-1918c.firebaseapp.com",
  projectId: "fir-auth-1918c",
  storageBucket: "fir-auth-1918c.appspot.com",
  messagingSenderId: "716750237257",
  appId: "1:716750237257:web:4cc9498a3dfc50ac6f5998",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export const update = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
    toast.success("Profil güncellendi");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};
export const resetPassword = async (password) => {
  try {
    await updatePassword(auth.currentUser, password);
    toast.success("Parolanız güncellendi");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};
export const emailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    toast.success(
      `Doğrulama maili ${auth.currentUser.email} adresine gönderildi, lütfen kontrol edin!`
    );
  } catch (error) {
    toast.error(error.message);
  }
};
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(
      loginHandle({
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        uid: user.uid,
      })
    );
  } else {
    store.dispatch(logoutHandle());
  }
});

export default app;
