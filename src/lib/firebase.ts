import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1mdUVyjf3P6FZhZvRqDO2DjD7vRrMAfg",
  authDomain: "akf-97b49.firebaseapp.com",
  projectId: "akf-97b49",
  storageBucket: "akf-97b49.firebasestorage.app",
  messagingSenderId: "945358773624",
  appId: "1:945358773624:web:40738a1d67d5c51161bc8d"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
