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

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

async function startup(UID, entry) {
  const res = await db
    .collection(UID)
    .doc(entry.date.toLocaleDateString("en-US", options))
    .set({
      [entry.date.getTime()]: entry,
    });
}
// startup("john", { date: new Date() });

async function addDoc(UID) {
  const res = await db.collection(UID).doc().set({});
}

async function addEntry(entry) {
  const res = await db
    .collection(entry.user)
    .doc(entry.date.toLocaleDateString("en-US", options))
    .set(
      {
        [entry.date.getTime()]: entry,
      },
      { merge: true }
    );
}

export default { addEntry, addDoc };
