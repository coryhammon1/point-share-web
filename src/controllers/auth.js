import app, { db, EmailAuthProvider } from "../firebase.js";

const auth = app.auth();

export async function isSignedIn() {
    return !!auth.currentUser;
}

export async function signInAnonymously() {
    return await auth.signInAnonymously();
}

export async function signOut() {
    return await auth.signOut();
}

export async function create(email, password, profileId, userId, signUpId) {
    if (!email) {
        throw new Error("Email is required.");
    }

    if (!password) {
        throw new Error("Password is required.");
    }

    if (!profileId) {
        throw new Error("Profile id is required.");
    }
    
    const cred = await auth.currentUser.linkWithCredential(EmailAuthProvider.credential(email, password))

    //TODO: need a contingency for when the below fails, but the user was created
    await db.collection("users").doc(profileId).update({ userId });

    //TODO: need a contingency for when the below fails
    await db.collection("signups").doc(signUpId).delete();

    return cred.user;
}