import React from "react";

import { Table } from "react-bootstrap";

import { useOrders } from "../stores/orders";
import { useProfiles } from "../stores/profile";

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

export default function Orders(props) {
    const profiles = useProfiles();

    const profilesIndex = new Map();

    for (let profile of (profiles || [])) {
        profilesIndex.set(profile.id, profile);
    }

    let orders = useOrders();
    
    if (orders === null) {
        return <p>Loading orders...</p>;
    }

    orders = orders.map(order => {
        const profile = profilesIndex.get(order.userId);

        return { ...order, profile };
    }).sort(compareOrders);

    return (
        <Table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>User</th>
                </tr>
            </thead>
            <tbody>
            {orders.map(order => <OrderRow key={order.id} order={order} />)}
            </tbody>
        </Table>
    );
}

function OrderRow({ order }) {
    return (
        <tr>
            <td>{formatter.format(order?.timestamp?.toDate())}</td>
            <td>{order?.profile?.displayName || "Loading..."}</td>
        </tr>
    );
}