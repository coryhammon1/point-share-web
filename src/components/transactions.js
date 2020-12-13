import React from "react";

import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";

//need to get users
import { transactionsState } from "../stores/transactions";
import { profilesState } from "../stores/profile";

import { timeFormat } from "../utils/time";

const componentState = combineLatest(transactionsState, profilesState).pipe(map(([txs, profiles]) => {
    let transactions = [];
    
    for (let tx of txs) {
        let transaction = { ...tx };
        for (let user of profiles) {
            if (transaction.from === user.id) {
                transaction.fromUser = user;
                break;
            }
        }

        for (let user of profiles) {
            if (transaction.to === user.id) {
                transaction.toUser = user;
                break;
            }
        }

        transactions.push(transaction);
    }

    return { transactions };
}));

export default class Transactions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: null
        };
    }

    componentDidMount() {
        this.sub = componentState.subscribe(state => {
            this.setState(state);
        });
    }

    componentWillUnmount() {
        this.sub.unsubscribe();
    }

    render() {
        if (!this.state.transactions) {
            return <p>Loading transactions...</p>;
        }

        const transactionElements = this.state.transactions.map(t => {
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
}