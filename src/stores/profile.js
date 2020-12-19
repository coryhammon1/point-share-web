import { useState, useEffect } from "react";

import { db } from "../firebase";

import { Observable, empty, of } from "rxjs";
import { switchMap } from "rxjs/operators";

import { authState } from "./auth";

function profileState(uid) {
    return Observable.create(o => {
        return db.collection("users").doc(uid).onSnapshot(doc => {
            if (!doc) {
                o.next(null);
                return;
            }

            o.next(doc.data());
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