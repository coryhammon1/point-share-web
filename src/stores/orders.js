import { useState, useEffect } from "react";

import { Observable } from "rxjs";

import { db } from "../firebase";

export const ordersState = Observable.create(o => {
    return db.collection("orders").onSnapshot(snapshot => {
        let orders = [];

        snapshot.forEach(doc => {
            orders.push({ id: doc.id, ...doc.data() });
        });

        o.next(orders);
    });
});

export function useOrders() {
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        let sub = ordersState.subscribe(os => {
            setOrders(os);
        });
        return () => {
            sub.unsubscribe();
        };
    }, []);

    return orders;
}