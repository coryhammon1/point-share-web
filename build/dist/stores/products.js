import { useState, useEffect } from "../../web_modules/react.js";

import { db } from "../firebase.js";

import { snapshotObservable } from "../utils/rxfirebase.js";

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