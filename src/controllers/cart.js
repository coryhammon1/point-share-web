import { db, FieldValue } from "../firebase";

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