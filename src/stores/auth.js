import app from "../firebase.js";

import { BehaviorSubject } from "rxjs";

const auth = app.auth();

const userSubject = new BehaviorSubject(null);

auth.onAuthStateChanged(user => {
    userSubject.next(user);
});

export const userState = userSubject.asObservable();

//other functions