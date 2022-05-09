import Parse from "parse";
import { apiKey, jsKey } from "../../secret";

Parse.initialize(apiKey, jsKey);
Parse.serverURL = "https://parseapi.back4app.com/";

const parseClasses = {

  event: { name: "event", fields: { dateTime: "dateTime", type: "type" } },
};



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
  try {
    console.log("Logging to firestore:", "Entry:", entry, "type:", type);
    entry.user = entry.user;
    const userRef = db.collection("user_logs").doc(entry.user);
    resolveDoc(userRef);
    const dateRef = userRef.collection("dates").doc(entry.date.dateString);
    resolveDoc(dateRef);
    addEntry(entry, dateRef, type);
  } catch (error) {
    // console.log(error); // user probably offline. Can't really do anything about that.
  }
}

export default {
  addLog,
};
