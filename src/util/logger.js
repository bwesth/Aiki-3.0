import firebase from "./firebase";

// firebase.addDoc("John");

export function logEvent(details) {
  firebase.addEntry("John", details);
}
