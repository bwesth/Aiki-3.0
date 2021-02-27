import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBY03Fx1mT9Oe2qmP4gcLJlWTF5nXVibRA",
  authDomain: "aiki3-e209a.firebaseapp.com",
  projectId: "aiki3-e209a",
  storageBucket: "aiki3-e209a.appspot.com",
  messagingSenderId: "664157650460",
  appId: "1:664157650460:web:244badc7671a88cf3fe9d9",
  measurementId: "G-GNDXYW96DS",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().useDeviceLanguage()


async function test() {
  const res = await db
    .collection("Users")
    .doc("johnsuserkey")
    .set({whatever: ["One", "two", "three", "tree"]});
  console.log(res);
}

async function addJohn() {
  const res = await db
  .collection("John is awesome")
  .doc("awesomesauce")
  .set({john:["Why", "won't", "you", "die"]});
  console.log(res);
}



export default {test, addJohn};