import { db } from "../firebase.js";

export function setUserType(uid, type) {
    return db.collection("users").doc(uid).update({ type });
}