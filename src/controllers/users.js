import { db, auth } from "../firebase";

//user creation is a little more complicated.
//we should first send an email to the email
//address with a link to the app. After
//clicking the link, the user will be redirected
//to a new page in the app, where a password is
//setup, and the final user auth information is
//added to firebase. The profile/user object will
//then be "verified".

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