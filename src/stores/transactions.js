import { db } from "../firebase";

import { currentProfileState } from "./profile";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";

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