import { db } from "../firebase";

import { of } from "rxjs";

import { switchAuthState } from "./auth";

import { snapshotObservable } from "../utils/rxfirebase";

function pointsState(uid) {
    return snapshotObservable(db.collection("points").doc(uid), doc => {
        if (!doc) {
            return null;
        }

        return doc.data();
    });
}

export const currentPointsState = switchAuthState(auth => {
    if (!auth.user) {
        return of(null);
    }

    return pointsState(auth.user.uid);
});