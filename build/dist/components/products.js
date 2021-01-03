import React, {useState} from "../../web_modules/react.js";
import {Card, CardDeck, Button, Spinner} from "../../web_modules/react-bootstrap.js";
import {useProducts} from "../stores/products.js";
import {useCurrentPoints} from "../stores/points.js";
import {useCurrentUser} from "../stores/auth.js";
import {addToCart} from "../controllers/cart.js";
export default function Products(props) {
  const products2 = useProducts();
  const currentPoints = useCurrentPoints();
  const currentUser = useCurrentUser();
  if (products2 === null) {
    return /* @__PURE__ */ React.createElement("p", null, "Loading...");
  }
  return /* @__PURE__ */ React.createElement(CardDeck, null, products2.map((product) => /* @__PURE__ */ React.createElement(Product, {
    key: product.id,
    user: currentUser,
    product,
    rewarded: currentPoints?.rewarded
  })));
}
function Product(props) {
  const product = props.product;
  const user = props.user;
  const [disabled, setDisabled] = useState(false);
  const handleAddToCart = (e) => {
    e.preventDefault();
    setDisabled(true);
    addToCart(user.uid, product.id).catch((err) => {
      console.error(err);
    }).finally(() => {
      setDisabled(false);
    });
  };
  const sufficient = (props.rewarded || 0) >= product.cost;
  return /* @__PURE__ */ React.createElement(Card, {
    style: {width: "18rem"}
  }, /* @__PURE__ */ React.createElement(Card.Body, null, /* @__PURE__ */ React.createElement(Card.Title, null, product.displayName), /* @__PURE__ */ React.createElement(Card.Text, null, product.description)), /* @__PURE__ */ React.createElement(Card.Footer, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    onClick: handleAddToCart,
    disabled: disabled || !sufficient
  }, disabled ? /* @__PURE__ */ React.createElement(Spinner, {
    as: "span",
    animation: "border",
    size: "sm",
    role: "status",
    "aria-hidden": "true"
  }) : null, !disabled ? /* @__PURE__ */ React.createElement("span", null, product.cost, " pts") : null)));
}
