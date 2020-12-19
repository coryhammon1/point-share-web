import React from "react";

import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";

//need to get users
import { transactionsState, useTransactions } from "../stores/transactions";
import { profilesState, useProfiles } from "../stores/profile";

import { timeFormat } from "../utils/time";

// const componentState = combineLatest(transactionsState, profilesState).pipe(map(([txs, profiles]) => {
//     let transactions = [];
    
//     for (let tx of txs) {
//         let transaction = { ...tx };
//         for (let user of profiles) {
//             if (transaction.from === user.id) {
//                 transaction.fromUser = user;
//                 break;
//             }
//         }

//         for (let user of profiles) {
//             if (transaction.to === user.id) {
//                 transaction.toUser = user;
//                 break;
//             }
//         }

//         transactions.push(transaction);
//     }

//     return { transactions };
// }));

function joinTransactions(transactions, profiles) {
    const profilesIndex = new Map();

    for (let profile of (profiles ?? [])) {
        profilesIndex.set(profile.id, profile);
    }

    return (transactions ?? []).map(transaction => {
        let tx = { ...transaction };

        tx.fromUser = profilesIndex.get(tx.from);
        tx.toUser = profilesIndex.get(tx.to);

        return tx;
    });
}

export default function Transactions(props) {
    const txs = useTransactions();
    const profiles = useProfiles();

    const transactions = joinTransactions(txs, profiles);

    const transactionElements = transactions.map(t => {
        const ts = t.ts ? t.ts.toDate() : new Date();

        const tsDisplay = timeFormat(ts);

        const fromDisplay = t.fromUser ? t.fromUser.displayName : t.from;
        const toDisplay = t.toUser ? t.toUser.displayName : t.to;
        return <div className="item" key={t.id}>
            <div className="content">
                <div className="right floated content">
                    <div className="description">{tsDisplay}</div>
                </div>
                <div>{fromDisplay} sent {t.amount} point{t.amount > 1 ? "s" : ""} to {toDisplay} for {t.description}</div>
            </div>
        </div>;
    });

    return (
        <div className="ui divided relaxed list">
        {transactionElements}
        </div>
    );
}