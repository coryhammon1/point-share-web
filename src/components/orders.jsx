import React from "react";

import { Table, Card, CardDeck, CardGroup, CardColumns } from "react-bootstrap";

import { useOrders } from "../stores/orders";
import { useProfiles } from "../stores/profile";
import { useProducts } from "../stores/products";

const tfOptions = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
};
const formatter = new Intl.DateTimeFormat("en-US", tfOptions);

function compareOrders(o1, o2) {
    if (o1.timestamp.isEqual(o2.timestamp)) {
        return 0;
    } else if (o1.timestamp < o2.timestamp) {
        return 1;
    } else {
        return -1;
    }
}

function compareItems(i1, i2) {
    return i1.product.displayName.localeCompare(i2.product.displayName);
}

export default function Orders(props) {
    const profiles = useProfiles();
    const products = useProducts();

    const profilesIndex = new Map();

    for (let profile of (profiles || [])) {
        profilesIndex.set(profile.id, profile);
    }

    const productsIndex = new Map();

    for (let product of (products || [])) {
        productsIndex.set(product.id, product);
    }

    let orders = useOrders();
    
    if (orders === null) {
        return <p>Loading orders...</p>;
    }

    orders = orders.map(order => {
        const profile = profilesIndex.get(order.userId);

        const items = Object.entries(order.items).map(([productId, item]) => {
            const product = productsIndex.get(productId);
            return { id: productId, product, ...item };
        }).sort(compareItems);

        return { ...order, items, profile };
    }).sort(compareOrders);

    return (
        <div>
        {orders.map(order => <OrderRow key={order.id} order={order} />)}
        </div>
    );
}

function OrderRow({ order }) {
    const shipping = order?.profile?.shipping;

    return (
        <div>
            <Card>
                <Card.Header>
                    {formatter.format(order?.timestamp?.toDate())}
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        {order?.profile?.displayName || "Loading..."}
                    </Card.Title>
                    <Card.Text>
                        {shipping ? 
                            <span>
                                <span>{shipping.street}</span>
                                <br />
                                <span>{shipping.city}, {shipping.state} {shipping.zip}</span>
                            </span>
                            : <span>Unknown shipping address</span>}
                    </Card.Text>
                    <Table>
                        <thead>
                            <tr>
                                <th>Product Id</th>
                                <th>Item</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                        {order.items.map(item => <OrderItem key={item.id} item={item} />)}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <br />
        </div>
    );
}

function OrderItem({ item }) {
    return (
        <tr>
            <td>
                {item.product.id}
            </td>
            <td>
                {item.product.displayName}
            </td>
            <td>
                {item.quantity}
            </td>
        </tr>
    );
}