
import React from "react";

import { Modal, Button, Table } from "react-bootstrap";
import { CartFill } from "react-bootstrap-icons";

import { useCurrentCart, useShowCart } from "../stores/cart";
import { useProducts } from "../stores/products";
import { useCurrentPoints } from "../stores/points";

import { setShowCart, setItemQuantity, checkout } from "../controllers/cart";

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
        setShowCart(true);
    }

    return (
        <Button variant="outline-primary" onClick={e => handleClick(e)}>
            <CartFill size={18} />
            <span>{count}</span>
        </Button>
    );
}

//IMPROVEMENT: this component is really big, and does a lot of work on each render.
export function CartModal(props) {
    const show = useShowCart();
    const cart = useCurrentCart();
    const products = useProducts() || [];
    const currentPoints = useCurrentPoints();

    

    const productsIndex = new Map();

    for (let product of products) {
        productsIndex.set(product.id, product);
    }

    const items = Object.entries(cart?.items || {}).map(([productId, item]) => {
        const product = productsIndex.get(productId);
        return { id: productId, ...item, ...product };
    }).sort((a, b) => a.id.localeCompare(b.id));

    let cartTotal = 0;

    for (let item of items) {
        cartTotal += (item.cost * item.quantity) || 0;
    }

    const remaining = (currentPoints?.rewarded || 0) - cartTotal;
    const sufficientPoints = remaining >= 0;

    const handleCheckout = (e) => {
        e.preventDefault();

        //TODO: is loading true
        
        checkout(cart.id, items, currentPoints.rewarded)
            .then(result => {
                //TODO: show success
                setShowCart(false);
            })
            .catch(err => {
                //TODO: show error
                console.error(err);
            })
            .finally(() => {
                //TODO: is loading false
            });
    };

    return (
        <Modal show={show} size="lg" onHide={e => setShowCart(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Description</th>
                            <th>Cost</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    {items.map(item => <CartItem key={item.id} item={item} cart={cart} />)}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{cartTotal}</td>
                        </tr>
                    </tfoot>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                {sufficientPoints ? <span>You will have {remaining} points left over.</span> : null}
                <Button variant="secondary" onClick={e => setShowCart(false)}>Cancel</Button>
                <Button variant={sufficientPoints ? "primary" : "danger"} onClick={e => handleCheckout(e)} disabled={!sufficientPoints}>
                    {sufficientPoints ? <span>Checkout</span> : <span>Not enough points</span>}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function CartItem(props) {
    const item = props.item;

    //to do: show a loading bar for every value that isn't loaded

    const total = (item.cost * item.quantity) || 0;

    return (
        <tr>
            <td>{item.displayName}</td>
            <td>{item.description}</td>
            <td>{item.cost || 0}</td>
            <td><CartItemQuantity {...item} cart={props.cart} /></td>
            <td>{total}</td>
        </tr>
    );
}

function CartItemQuantity(props) {
    const id = props.id;
    const quantity = props.quantity;
    const cart = props.cart;

    const handleDecrement = e => {
        e.preventDefault();

        //disable

        setItemQuantity(cart.id, id, Math.max(quantity - 1, 0))
            .catch(err => {
                console.error(err);
                //TODO: display error
            })
            .finally(() => {
                //TODO: re enable
            });
    }

    const handleIncrement = e => {
        e.preventDefault();
        
        //TODO: disable

        setItemQuantity(cart.id, id, quantity + 1)
            .catch(err => {
                console.error(err);
                //TODO: display error
            })
            .finally(() => {
                //TODO: re enable
            });
    }

    return (
        <div>
            <Button variant="outline-secondary" onClick={handleDecrement}>-</Button>
            <span>{quantity || 0}</span>
            <Button variant="outline-secondary" onClick={handleIncrement}>+</Button>
        </div>
    );
}