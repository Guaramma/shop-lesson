import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA5OsqJPsRYUYepf8Kk7dJdx4T-VmkM6J0",
  authDomain: "react-shop-e2127.firebaseapp.com",
  databaseURL: "https://react-shop-e2127.firebaseio.com",
  projectId: "react-shop-e2127",
  storageBucket: "react-shop-e2127.appspot.com",
  messagingSenderId: "636721134832",
  appId: "1:636721134832:web:6768c7a1c79ba79a641635",
  measurementId: "G-SKS9VFGK9X"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
