import { useState, useEffect } from "react";

import { Observable, of, BehaviorSubject } from "rxjs";
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

//cart modal display

export const showCart = new BehaviorSubject(true);

export function useShowCart() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const sub = showCart.subscribe(s => {
            setShow(s);
        });
        return () => {
            sub.unsubscribe();
        };
    }, []);

    return show;
}