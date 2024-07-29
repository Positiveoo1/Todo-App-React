import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6gJpBKo6I7ZtQyWkaRM2LzdHNKj58gbY",
  authDomain: "todoapp-83a12.firebaseapp.com",
  projectId: "todoapp-83a12",
  storageBucket: "todoapp-83a12.appspot.com",
  messagingSenderId: "775493340305",
  appId: "1:775493340305:web:2b225a2dae8c1e09d50330",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
