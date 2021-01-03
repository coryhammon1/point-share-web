import { useState, useEffect } from "../../web_modules/react.js";

import { db } from "../firebase.js";

import { Observable, empty, of } from "../../web_modules/rxjs.js";
import { switchMap } from "../../web_modules/rxjs/operators.js";

import { authState } from "./auth.js";

function profileState(uid) {
    return Observable.create(o => {
        return db.collection("users").doc(uid).onSnapshot(doc => {
            if (!doc) {
                o.next(null);
                return;
            }

            o.next({ id: doc.id, ...doc.data() });
        });
    });
}

function profiles(uid) {
    //TODO: will need to restrict while profiles this user can see
    return Observable.create(o => {
        return db.collection("users").onSnapshot(snapshot => {
            let profiles = [];
            snapshot.forEach(doc => {
                profiles.push({ id: doc.id, ...doc.data() });
            });
            o.next(profiles);
        });
    });
}

export const currentProfileState = authState.pipe(switchMap(auth => {
    if (!auth.user) {
        return of(null);
    }

    const uid = auth.user.uid;

    return profileState(uid);
}));

export function useCurrentProfile() {
    const [currentProfile, setCurrentProfile] = useState(null);

    useEffect(() => {
        let sub = currentProfileState.subscribe(profile => {
            setCurrentProfile(profile);
        });
        return () => {
            sub.unsubscribe();
        };
    }, []);

    return currentProfile;
}

export const profilesState = authState.pipe(switchMap(auth => {
    if (!auth.user) {
        return of([]);
    }

    return profiles(auth.user.uid);
}));

export function useProfiles() {
    const [profiles, setProfiles] = useState(null);

    useEffect(() => {
        let sub = profilesState.subscribe(profiles => {
            setProfiles(profiles);
        });
        return () => {
            sub.unsubscribe();
        };
    }, []);

    return profiles;
}