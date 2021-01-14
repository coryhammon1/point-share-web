import { useState, useEffect } from "react";

import { Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";

import { db } from "../firebase";

import { profileState } from "./profile";

export function signUpState(id) {
    return Observable.create(o => {
        return db.collection("signups").doc(id).onSnapshot(doc => {
            if (!doc) {
                o.next(null);
                return;
            }

            if (!doc.exists) {
                o.next({});
                return;
            }

            o.next({ id: doc.id, ...doc.data() });
        }, err => {
            console.error(err);
            o.next({});
        });
    });
}

export function signUpWithProfileState(id) {
    return signUpState(id).pipe(switchMap(signUp => {
        if (!signUp) {
            return of(null);
        }

        const profileId = signUp?.profileId;

        if (!profileId) {
            return of(signUp);
        }

        return profileState(profileId).pipe(map(profile => {
            return { ...signUp, profile };
        }));
    }));
}