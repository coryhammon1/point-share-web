import { useState, useEffect } from "../../web_modules/react.js";

import { of } from "../../web_modules/rxjs.js";

import { db } from "../firebase.js";

import { switchAuthState } from "./auth.js";

import { snapshotObservable } from "../utils/rxfirebase.js";

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

//hooks

export function useCurrentPoints() {
    const [points, setPoints] = useState(null);

    useEffect(() => {
        let sub = currentPointsState.subscribe(points => {
            setPoints(points);
        });
        return () => {
            sub.unsubscribe();
        };
    }, []);

    return points;
}