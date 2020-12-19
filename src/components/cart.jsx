
import React, { useEffect } from "react";

import { useCurrentCart } from "../stores/cart";

import { Modal, Button } from "react-bootstrap";

export function CartIcon(props) {
    const cart = useCurrentCart();

    let count = 0;
    if (cart && cart.items) {
        for (let item of Object.values(cart.items)) {
            count += item.quantity;
        }
    }

    const handleClick = e => {
        e.preventDefault();

        console.log(cart);
    }

    return (
        <div onClick={e => handleClick(e)}>
            <i className="shopping cart icon" />
            <span>{count}</span>
        </div>
    );
}

export function CartModal(props) {
    return (
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal.Dialog>
    );
}