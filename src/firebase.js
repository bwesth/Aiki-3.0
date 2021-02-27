import firebase from "firebase/app";
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

async function addDoc(UID) {
  const res = await db.collection("log_entries").doc(UID).set({});
}

async function addEntry(UID, entry) {
  console.log("Creating log for " + UID);
  console.log(entry);
  const ref = db.collection("log_entries").doc(UID);
  console.log("ref created");
  const res = await ref.update({
    [entry.date.getTime()]: entry,
  });
}

export default { addEntry, addDoc };
