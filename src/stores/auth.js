import app from "../firebase.js";

import { BehaviorSubject } from "rxjs";
import { switchMap, map } from "rxjs/operators";

const auth = app.auth();

const authSubject = new BehaviorSubject({ initialized: false, user: null });

auth.onAuthStateChanged(user => {
    authSubject.next({ initialized: true, user });
});

export const authState = authSubject.asObservable();

export const currentUser = authState.pipe(map(auth => {
    return auth?.user;
}));

export function switchAuthState(f) {
    return authState.pipe(switchMap(f));
}

export function authenticate(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}