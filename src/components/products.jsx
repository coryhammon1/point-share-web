import React, { useState } from "react";

import { Card, CardDeck, Button, Spinner } from "react-bootstrap";

import { useProducts } from "../stores/products";
import { useCurrentPoints } from "../stores/points";
import { useCurrentUser } from "../stores/auth";

import { addToCart } from "../controllers/cart";

export default function Products(props) {
    const products = useProducts();
    const currentPoints = useCurrentPoints();
    const currentUser = useCurrentUser();

    if (products === null) {
        return <p>Loading...</p>;
    }

    return (
        <CardDeck>
        {products.map(product => <Product key={product.id} user={currentUser} product={product} rewarded={currentPoints?.rewarded} />)}
        </CardDeck>
    );
}

function Product(props) {
    const product = props.product;
    const user = props.user;

    const [disabled, setDisabled] = useState(false);

    const handleAddToCart = e => {
        e.preventDefault();

        setDisabled(true);

        addToCart(user.uid, product.id)
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setDisabled(false);
            });
    };

    const sufficient = (props.rewarded || 0) >= product.cost;

    return (
        <Card style={{ width: "18rem" }}>
            <Card.Body>
                <Card.Title>{product.displayName}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button variant="primary" onClick={handleAddToCart} disabled={disabled || !sufficient}>
                    {disabled ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : null}
                    {!disabled ? <span>{product.cost} pts</span> : null}                    
                </Button>
            </Card.Footer>
        </Card>
    );
}