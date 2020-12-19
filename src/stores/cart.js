import { useState, useEffect } from "react";

import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

import { db } from "../firebase";

import { currentUser } from "./auth";

export const currentCart = currentUser.pipe(switchMap(user => {
    if (!user) {
        return of(null);
    }

    const uid = user.uid;

    return Observable.create(o => {
        return db.collection("carts").doc(uid).onSnapshot(doc => {
            if (!doc) {
                o.next(null);
                return;
            }

            o.next({ id: doc.id, ...doc.data() });
        });
    });
}));

export function useCurrentCart() {
    const [cart, setCart] = useState(null);

    useEffect(() => {
        const sub = currentCart.subscribe(c => {
            setCart(c);
        });
        return () => {
            sub.unsubscribe();
        }
    }, []);

    return cart;
}