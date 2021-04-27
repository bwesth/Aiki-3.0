import firebase from "firebase/app";
import "firebase/firebase-firestore";
import { hash } from "./security";

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

/**
 * @async
 * @function
 * @param {DocumentReference} ref A reference to a firestore document
 * @description Checks if referenced document has a field. If not, it creates a field (active = true).
 * This serves the purpose of later being able to get a list of all documents in a collection.
 * If a document does not contain a field, it is not seen as a document by firestore, even if it contains a subcollection.
 */
async function resolveDoc(ref) {
  const res = await ref.get();
  const active = res.data();
  if (!active) {
    const res = await ref.set({ active: true }, { merge: true });
  }
}

/**
 * @async
 * @function
 * @param {object} entry The data to be stored in firestore.
 * @param {DocumentReference} reference A reference to the nested document which should contain the entry.
 * @param {string} type Type of entry choosing from "config" | "session" | "redirection"
 * @description Takes a document reference and adds the entry as a document within a collection specified by type.
 */
async function addEntry(entry, reference, type) {
  const entryRes = await reference
    .collection(type + "_logs")
    .doc("" + entry.date.timestamp)
    .set(entry, { merge: true });
}

/**
 * @async
 * @function
 * @param {object} entry
 * @param {string} type
 * @description Top level function to add log entries to firestore.
 * Takes entry object and type of entry and resolves each level of firestore document/collection used.
 * Finally adds entry at appropriate log type within the appropriate date collection.
 */
async function addLog(entry, type) {
  console.log("Logging to firestore:", "Entry:", entry, "type:", type);
  entry.user = `${hash(entry.user)}`;
  const userRef = db.collection("user_logs").doc(entry.user);
  resolveDoc(userRef);
  const dateRef = userRef.collection("dates").doc(entry.date.dateString);
  resolveDoc(dateRef);
  addEntry(entry, dateRef, type);
}

export default {
  addLog,
};
