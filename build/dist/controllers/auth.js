import app from "../firebase.js";

const auth = app.auth();

export async function signOut() {
    return await auth.signOut();
}