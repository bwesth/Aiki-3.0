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

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

async function resolveDoc(ref) {
  const res = await ref.get();
  const active = res.data();
  if (!active) {
    const res = await ref.set({ active: true }, { merge: true });
  }
}

async function addEntry(entry, reference, type) {
  const entryRes = await reference
    .collection(type + "_logs")
    .doc("" + entry.date.timestamp)
    .set(entry, { merge: true });
}

async function addLog(entry, type) {
  const userRef = db.collection("user_logs").doc(entry.user);
  resolveDoc(userRef);
  const dateRef = userRef.collection("dates").doc(entry.date.dateString);
  resolveDoc(dateRef);
  addEntry(entry, dateRef, type);
}

export default {
  addLog,
};
