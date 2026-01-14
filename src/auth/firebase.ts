
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuvwIlpl5DkNFCKAQwYRH8Uh7jgGjSfiw",
  authDomain: "designsystemluwy.firebaseapp.com",
  projectId: "designsystemluwy",
  storageBucket: "designsystemluwy.firebasestorage.app",
  messagingSenderId: "796935335686",
  appId: "1:796935335686:web:a26ad32437a44b58c13887"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error(error);
    return null;
  }
};