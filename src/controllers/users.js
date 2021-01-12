import { db } from "../firebase";

export async function create(user) {
    //TODO: create a firebase user...

    const doc = db.collection("users").doc();

    try {
        return await doc.set(user);
    } catch (err) {
        console.error(err);
        throw new Error("Failed to create user."); 
    }
}

export async function update(user) {
    console.log("update", user);

    throw new Error("This is an error");
}