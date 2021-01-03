import React from "../../web_modules/react.js";
import {Modal, Button, Table} from "../../web_modules/react-bootstrap.js";
import {CartFill} from "../../web_modules/react-bootstrap-icons.js";
import {useCurrentCart, useShowCart} from "../stores/cart.js";
import {useProducts} from "../stores/products.js";
import {useCurrentPoints} from "../stores/points.js";
import {setShowCart, setItemQuantity, checkout} from "../controllers/cart.js";
export function CartIcon(props) {
  const cart3 = useCurrentCart();
  let count = 0;
  if (cart3 && cart3.items) {
    for (let item of Object.values(cart3.items)) {
      count += item.quantity;
    }
  }
  const handleClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };
  return /* @__PURE__ */ React.createElement(Button, {
    variant: "outline-primary",
    onClick: (e) => handleClick(e)
  }, /* @__PURE__ */ React.createElement(CartFill, {
    size: 18
  }), /* @__PURE__ */ React.createElement("span", null, count));
}
export function CartModal(props) {
  const show = useShowCart();
  const cart3 = useCurrentCart();
  const products2 = useProducts() || [];
  const currentPoints = useCurrentPoints();
  const productsIndex = new Map();
  for (let product of products2) {
    productsIndex.set(product.id, product);
  }
  const items = Object.entries(cart3?.items || {}).map(([productId, item]) => {
    const product = productsIndex.get(productId);
    return {id: productId, ...item, ...product};
  }).sort((a, b) => a.id.localeCompare(b.id));
  let cartTotal = 0;
  for (let item of items) {
    cartTotal += item.cost * item.quantity || 0;
  }
  const remaining = (currentPoints?.rewarded || 0) - cartTotal;
  const sufficientPoints = remaining >= 0;
  const handleCheckout = (e) => {
    e.preventDefault();
    checkout(cart3.id, items, currentPoints.rewarded).then((result) => {
      setShowCart(false);
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
    });
  };
  return /* @__PURE__ */ React.createElement(Modal, {
    show,
    size: "lg",
    onHide: (e) => setShowCart(false)
  }, /* @__PURE__ */ React.createElement(Modal.Header, {
    closeButton: true
  }, /* @__PURE__ */ React.createElement(Modal.Title, null, "Cart")), /* @__PURE__ */ React.createElement(Modal.Body, null, /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Product"), /* @__PURE__ */ React.createElement("th", null, "Description"), /* @__PURE__ */ React.createElement("th", null, "Cost"), /* @__PURE__ */ React.createElement("th", null, "Quantity"), /* @__PURE__ */ React.createElement("th", null, "Total"))), /* @__PURE__ */ React.createElement("tbody", null, items.map((item) => /* @__PURE__ */ React.createElement(CartItem, {
    key: item.id,
    item,
    cart: cart3
  }))), /* @__PURE__ */ React.createElement("tfoot", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null), /* @__PURE__ */ React.createElement("td", null), /* @__PURE__ */ React.createElement("td", null), /* @__PURE__ */ React.createElement("td", null), /* @__PURE__ */ React.createElement("td", null, cartTotal))))), /* @__PURE__ */ React.createElement(Modal.Footer, null, sufficientPoints ? /* @__PURE__ */ React.createElement("span", null, "You will have ", remaining, " points left over.") : null, /* @__PURE__ */ React.createElement(Button, {
    variant: "secondary",
    onClick: (e) => setShowCart(false)
  }, "Cancel"), /* @__PURE__ */ React.createElement(Button, {
    variant: sufficientPoints ? "primary" : "danger",
    onClick: (e) => handleCheckout(e),
    disabled: !sufficientPoints
  }, sufficientPoints ? /* @__PURE__ */ React.createElement("span", null, "Checkout") : /* @__PURE__ */ React.createElement("span", null, "Not enough points"))));
}
function CartItem(props) {
  const item = props.item;
  const total = item.cost * item.quantity || 0;
  return /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, item.displayName), /* @__PURE__ */ React.createElement("td", null, item.description), /* @__PURE__ */ React.createElement("td", null, item.cost || 0), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(CartItemQuantity, {
    ...item,
    cart: props.cart
  })), /* @__PURE__ */ React.createElement("td", null, total));
}
function CartItemQuantity(props) {
  const id = props.id;
  const quantity = props.quantity;
  const cart3 = props.cart;
  const handleDecrement = (e) => {
    e.preventDefault();
    setItemQuantity(cart3.id, id, Math.max(quantity - 1, 0)).catch((err) => {
      console.error(err);
    }).finally(() => {
    });
  };
  const handleIncrement = (e) => {
    e.preventDefault();
    setItemQuantity(cart3.id, id, quantity + 1).catch((err) => {
      console.error(err);
    }).finally(() => {
    });
  };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Button, {
    variant: "outline-secondary",
    onClick: handleDecrement
  }, "-"), /* @__PURE__ */ React.createElement("span", null, quantity || 0), /* @__PURE__ */ React.createElement(Button, {
    variant: "outline-secondary",
    onClick: handleIncrement
  }, "+"));
}
