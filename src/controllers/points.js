import { db, FieldValue } from "../firebase";

export function sendPoints(amount, from, to, description) {
    if (amount < 1) {
        return Promise.reject("Amount must be more than 0");
    }

    const tx = {
        amount,
        from,
        to,
        description,
        ts: FieldValue.serverTimestamp()
    };
    return db.runTransaction(t => {
        let fromDoc = db.collection("points").doc(from);
        let toDoc = db.collection("points").doc(to);
        return t.get(fromDoc).then(from => t.get(toDoc).then(to => [from, to])).then(([from, to]) => {
            if (!from) {
                throw "From doesn't exist";
            }

            let fromPoints = from.data().points - tx.amount;

            if (fromPoints < 0) {
                return Promise.reject("Not enough points.");
            }

            t.update(fromDoc, { points: fromPoints });

            if (!to.data()) {
                t.set(toDoc, { rewarded: amount });
                return [fromPoints, amount];
            }

            let toPoints = (to.data().rewarded || 0) + 10;

            t.update(toDoc, { rewarded: toPoints });

            return [fromPoints, toPoints];
        });
    }).then(points => {
        return db.collection("transactions").doc().set(tx);
    });
}