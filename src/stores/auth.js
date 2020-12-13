import app from "../firebase.js";

import { BehaviorSubject } from "rxjs";
import { switchMap } from "rxjs/operators";

const auth = app.auth();

const authSubject = new BehaviorSubject({ initialized: false, user: null });

auth.onAuthStateChanged(user => {
    authSubject.next({ initialized: true, user });
});

export const authState = authSubject.asObservable();

export function switchAuthState(f) {
    return authState.pipe(switchMap(f));
}

export async function authenticate(email, password) {
    try {
        return await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        console.error("Failed to authenticate", error);
        throw error;
    }
}