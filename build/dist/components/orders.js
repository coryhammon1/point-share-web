import React from "../../web_modules/react.js";
import {Table, Card, CardDeck, CardGroup, CardColumns} from "../../web_modules/react-bootstrap.js";
import {useOrders} from "../stores/orders.js";
import {useProfiles} from "../stores/profile.js";
import {useProducts} from "../stores/products.js";
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
  const products2 = useProducts();
  const profilesIndex = new Map();
  for (let profile2 of profiles || []) {
    profilesIndex.set(profile2.id, profile2);
  }
  const productsIndex = new Map();
  for (let product of products2 || []) {
    productsIndex.set(product.id, product);
  }
  let orders2 = useOrders();
  if (orders2 === null) {
    return /* @__PURE__ */ React.createElement("p", null, "Loading orders...");
  }
  orders2 = orders2.map((order) => {
    const profile2 = profilesIndex.get(order.userId);
    const items = Object.entries(order.items).map(([productId, item]) => {
      const product = productsIndex.get(productId);
      return {id: productId, product, ...item};
    }).sort(compareItems);
    return {...order, items, profile: profile2};
  }).sort(compareOrders);
  return /* @__PURE__ */ React.createElement("div", null, orders2.map((order) => /* @__PURE__ */ React.createElement(OrderRow, {
    key: order.id,
    order
  })));
}
function OrderRow({order}) {
  const shipping = order?.profile?.shipping;
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(Card.Header, null, formatter.format(order?.timestamp?.toDate())), /* @__PURE__ */ React.createElement(Card.Body, null, /* @__PURE__ */ React.createElement(Card.Title, null, order?.profile?.displayName || "Loading..."), /* @__PURE__ */ React.createElement(Card.Text, null, shipping ? /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("span", null, shipping.street), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", null, shipping.city, ", ", shipping.state, " ", shipping.zip)) : /* @__PURE__ */ React.createElement("span", null, "Unknown shipping address")), /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Product Id"), /* @__PURE__ */ React.createElement("th", null, "Item"), /* @__PURE__ */ React.createElement("th", null, "Quantity"))), /* @__PURE__ */ React.createElement("tbody", null, order.items.map((item) => /* @__PURE__ */ React.createElement(OrderItem, {
    key: item.id,
    item
  })))))), /* @__PURE__ */ React.createElement("br", null));
}
function OrderItem({item}) {
  return /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, item.product.id), /* @__PURE__ */ React.createElement("td", null, item.product.displayName), /* @__PURE__ */ React.createElement("td", null, item.quantity));
}
