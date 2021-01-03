import { useState, useEffect } from "../../web_modules/react.js";

import { db } from "../firebase.js";

import { currentProfileState } from "./profile.js";
import { Observable } from "../../web_modules/rxjs.js";
import { switchMap } from "../../web_modules/rxjs/operators.js";

export const transactionsState = currentProfileState.pipe(switchMap(profile => {
    //TODO: decide which transactions this user can see
    return Observable.create(o => {
        return db.collection("transactions").orderBy("ts", "desc").limit(5).onSnapshot(snapshot => {
            let txs = [];

            snapshot.forEach(doc => {
                txs.push({ id: doc.id, ...doc.data() });
            });

            o.next(txs);
        });
    });
}));

export function useTransactions() {
    const [transactions, setTransactions] = useState(null);

    useEffect(() => {
        let sub = transactionsState.subscribe(txs => {
            setTransactions(txs);
        });
        return () => {
            sub.unsubscribe();
        };
    }, []);

    return transactions;
}