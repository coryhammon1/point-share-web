import { db, FieldValue } from "../firebase.js";

import { showCart } from "../stores/cart.js";

export async function setShowCart(show) {
    showCart.next(show);
}

export async function addToCart(uid, productId) {
    let cartDoc = db.collection("carts").doc(uid);

    let snapshot = await cartDoc.get();

    if (!snapshot.exists) {
        let items = {};
        items[productId] = { quantity: 1 };
        return await cartDoc.set({ items });
    } else {
        let update = {};
        update["items." + productId + ".quantity"] = FieldValue.increment(1);
        return await cartDoc.update(update);
    }
}

export async function setItemQuantity(uid, productId, quantity) {
    const doc = db.collection("carts").doc(uid);

    let update = {};
    update["items." + productId + ".quantity"] = quantity;

    return await doc.update(update);
}

export async function checkout(uid, items, rewarded) {
    let orderItems = {};

    let remaining = rewarded;

    for (let item of items) {
        orderItems[item.id] = { quantity: item.quantity, cost: item.cost };
        remaining -= item.quantity * item.cost;
    }

    const order = {
        userId: uid,
        items: orderItems,
        timestamp: FieldValue.serverTimestamp()
    };

    let pointsDoc = db.collection("points").doc(uid);
    let cartDoc = db.collection("carts").doc(uid);
    let orderDoc = db.collection("orders").doc();

    let batch = db.batch();
    batch.delete(cartDoc);
    batch.set(pointsDoc, { rewarded: remaining });
    batch.set(orderDoc, order);

    return await batch.commit();
}

/*
const checkout = async (cart, rewarded) => {
    const uid = auth.currentUser.uid;

    let items = {};

    for (let productId in cart.items) {
        let cartItem = cart.items[productId];
        items[productId] = { quantity: cartItem.quantity, cost: cartItem.cost };
    }

    let order = {
        userId: uid,
        items,
        timestamp: FieldValue.serverTimestamp()
    };

    let pointsDoc = db.collection("points").doc(uid);
    let cartDoc = db.collection("carts").doc(uid);
    let orderDoc = db.collection("orders").doc();

    let batch = db.batch();
    batch.delete(cartDoc);
    batch.set(pointsDoc, { rewarded });
    batch.set(orderDoc, order);

    return batch.commit();
}
*/