import { db } from "../firebase";

import { snapshotObservable } from "../utils/rxfirebase";

export const productsState = snapshotObservable(db.collection("products"), snapshot => {
    let products = [];

    snapshot.forEach(doc => {
        products.push({ id: doc.id, ...doc.data() });
    });

    return products;
});