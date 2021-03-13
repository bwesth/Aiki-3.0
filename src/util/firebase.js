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
  const res = await db.collection(UID).doc().set({});
}

async function addEntry(entry) {
  const res = await db
    .collection(entry.user)
    .doc(entry.date.date)
    .set(
      {
        [entry.date.timestamp]: entry,
      },
      { merge: true }
    );
}

async function addProcrastinationEvent(entry) {
  const res = await db
    .collection("user_logs")
    .doc(entry.user)
    .collection("dates")
    .doc(entry.date.date)
    .collection("procrastination_site_logs")
    .doc("" + entry.date.timestamp)
    .set(
      {
        date: entry.date,
        eventDetails: entry.eventDetails,
        name: entry.name,
        navigationType: entry.navigationType,
        tag: entry.tag,
        user: entry.user,
      },
      { merge: true }
    );
}

async function addLearningEvent(entry) {
  const res = await db
    .collection("user_logs")
    .doc(entry.user)
    .collection("dates")
    .doc(entry.date.date)
    .collection("learning_site_logs")
    .doc("" + entry.date.timestamp)
    .set(
      {
        date: entry.date,
        eventDetails: entry.eventDetails,
        name: entry.name,
        navigationType: entry.navigationType,
        tag: entry.tag,
        user: entry.user,
      },
      { merge: true }
    );
}

async function addConfigLog(entry) {
  const res = await db
    .collection("user_logs")
    .doc(entry.user)
    .collection("dates")
    .doc(entry.date.date)
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
  addEntry,
  addProcrastinationEvent,
  addConfigLog,
  addLearningEvent,
};
