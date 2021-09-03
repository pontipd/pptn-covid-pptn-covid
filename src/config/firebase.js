import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import firebase from 'firebase/compat/app'

const firebaseConfig = {
  apiKey: "AIzaSyCKKgaj4uX89Wt8OaJtF6DcsePnyG1qeN8",
  authDomain: "pptn-covid-app-01.firebaseapp.com",
  databaseURL: "https://pptn-covid-app-01-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pptn-covid-app-01",
  storageBucket: "pptn-covid-app-01.appspot.com",
  messagingSenderId: "201201252822",
  appId: "1:201201252822:web:1431e9186bc154b8cfcc77",
  measurementId: "G-WJ2QPYKHTN",
};

firebase.initializeApp(firebaseConfig);

const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();
const auth = getAuth();

export { providerGoogle, providerFacebook, auth }