import { db } from "../firebase";

export function setUserType(uid, type) {
    return db.collection("users").doc(uid).update({ type });
}