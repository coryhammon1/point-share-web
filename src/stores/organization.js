import { useState, useEffect } from "react";

import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

import { db } from "../firebase";

import { currentProfileState } from "../stores/profile";

export function organizationState(orgId) {
    return Observable.create(o => {
        return db.collection("organizations").doc(orgId).onSnapshot(doc => {
            if (!doc) {
                o.next(null);
                return;
            }

            o.next({ id: doc.id, ...doc.data() });
        });
    });
}

export const currentOrganizationState = currentProfileState.pipe(switchMap(profile => {
    if (!profile) {
        return of(null);
    }

    return organizationState(profile.orgId);
}));

export function useCurrentOrganization() {
    const [organization, setOrganization] = useState(null);

    useEffect(() => {
        let sub = currentOrganizationState.subscribe(org => {
            setOrganization(org);
        });
        return () => {
            sub.unsubscribe();
        };
    }, []);

    return organization;
}