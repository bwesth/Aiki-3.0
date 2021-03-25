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

async function addLogEntry(entry) {
  const res = await db
    .collection("user_logs")
    .doc(entry.user)
    .collection("dates")
    .doc(entry.date.dateString)
    .collection("session_logs")
    .doc("" + entry.date.timestamp)
    .set(entry, { merge: true });
}

async function addConfigLog(entry) {
  const res = await db
    .collection("user_logs")
    .doc(entry.user)
    .collection("dates")
    .doc(entry.date.dateString)
    .collection("config_logs")
    .doc("" + entry.date.timestamp)
    .set(
      {
        date: entry.date,
        user: entry.user,
        event: entry.event,
        site: entry.site ? entry.site : "",
      },
      { merge: true }
    );
}

export default {
  addLogEntry,
  addConfigLog,
};
