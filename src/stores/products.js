import { useState, useEffect } from "react";

import { db } from "../firebase";

import { snapshotObservable } from "../utils/rxfirebase";

export const productsState = snapshotObservable(db.collection("products"), snapshot => {
    let products = [];

    snapshot.forEach(doc => {
        products.push({ id: doc.id, ...doc.data() });
    });

    return products;
});

export function useProducts() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        let sub = productsState.subscribe(products => {
            setProducts(products);
        });
        return () => {
            sub.unsubscribe();
        };
    }, []);

    return products;
}