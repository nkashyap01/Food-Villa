import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_GJsMKCW_J-bRGcIRxwGVQ9ZwcV20puU",
  authDomain: "food-delivery-website-e1155.firebaseapp.com",
  projectId: "food-delivery-website-e1155",
  storageBucket: "food-delivery-website-e1155.appspot.com",
  messagingSenderId: "591642836011",
  appId: "1:591642836011:web:dfaad0c6bf2b8d88b0be6e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export default auth;
