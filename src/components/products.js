import React from "react";

import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";

import { productsState } from "../stores/products";
import { currentPointsState } from "../stores/points";
import { currentUser } from "../stores/auth";

import { addToCart } from "../controllers/cart";

const componentState = combineLatest(productsState, currentPointsState, currentUser).pipe(map(([products, points, user]) => {
    let rewarded = points?.rewarded;
    return { products, rewarded, user };
}));

export default class Products extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: null,
            rewarded: null,
            user: null
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
        if (this.state.products === null) {
            return <p>Loading products...</p>;
        }

        return (
            <div className="ui cards">
            {this.state.products.map(product => <Product key={product.id} user={this.state.user} product={product} rewarded={this.state.rewarded} />)}
            </div>
        );
    }
}

class Product extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: false,
            error: null
        };

        this.handleAddToCart = this.handleAddToCart.bind(this);
    }

    handleAddToCart(e) {
        this.setState({ disabled: true });

        addToCart(this.props.user.uid, this.props.product.id)
            .then(result => {
                this.setState({ disabled: false });
            })
            .catch(err => {
                console.error(err);
                // this.setState({ error: err, disabled: false });
                this.setState({ disabled: false });
            });
    }

    render() {
        const product = this.props.product;
        const disabled = this.state.disabled ? "disabled" : null;

        const sufficient = ((this.props.rewarded || 0) - product.cost) >= 0;

        return (
            <div className="ui card">
                <div className="content">
                    <div className="header">
                    {product.displayName}
                    <span className="right floated">
                        {product.cost} pts.
                    </span>
                    </div>
                </div>
                {this.state.error ? <div className="content">Failed to redeem: {this.state.error}</div> : null}
                <div className="content">
                    {product.description}
                </div>
                <div className="content">
                    <button className="middle floated ui basic button" onClick={this.handleAddToCart} disabled={disabled || !sufficient}>
                        Add To Cart
                    </button>
                </div>
            </div>
        );
    }
}