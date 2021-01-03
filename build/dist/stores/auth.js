import { useState, useEffect } from "../../web_modules/react.js";

import app from "../firebase.js";

import { BehaviorSubject } from "../../web_modules/rxjs.js";
import { switchMap, map } from "../../web_modules/rxjs/operators.js";

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

export function useCurrentUser() {
    const [user, setCurrentUser] = useState(null);

    useEffect(() => {
        let sub = currentUser.subscribe(user => {
            setCurrentUser(user);
        });
        return () => {
            sub.unsubscribe();
        };
    }, []);

    return user;
}