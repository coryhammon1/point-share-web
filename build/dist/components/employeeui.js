import React from "../../web_modules/react.js";
import {Container, Navbar, Button, Row, Col} from "../../web_modules/react-bootstrap.js";
import Transactions from "./transactions.js";
import Points from "./points.js";
import TransactionForm from "./transactionform.js";
import RewardedPoints from "./rewardedpoints.js";
import Products from "./products.js";
import {CartIcon, CartModal} from "./cart.js";
import UserTypeSwitch from "./usertypeswitch.js";
import {useCurrentProfile} from "../stores/profile.js";
import {signOut} from "../controllers/auth.js";
function Navigation({user}) {
  const currentProfile = useCurrentProfile();
  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();
  };
  return /* @__PURE__ */ React.createElement(Navbar, {
    bg: "light",
    variant: "light"
  }, /* @__PURE__ */ React.createElement(Navbar.Brand, null, "Point Share"), /* @__PURE__ */ React.createElement(Navbar.Toggle, null), /* @__PURE__ */ React.createElement(Navbar.Collapse, {
    className: "justify-content-end"
  }, /* @__PURE__ */ React.createElement(Navbar.Text, null, user.email), currentProfile?.admin ? /* @__PURE__ */ React.createElement(UserTypeSwitch, {
    profile: currentProfile
  }) : null, /* @__PURE__ */ React.createElement(Navbar.Text, null, /* @__PURE__ */ React.createElement(CartIcon, null)), /* @__PURE__ */ React.createElement(Navbar.Text, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "secondary",
    onClick: (e) => handleSignOut(e)
  }, "Sign Out"))));
}
export default function EmployeeUI(props) {
  const auth2 = props.auth;
  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();
  };
  return /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(CartModal, null), /* @__PURE__ */ React.createElement(Row, null, /* @__PURE__ */ React.createElement(Col, null, /* @__PURE__ */ React.createElement(Navigation, {
    user: auth2.user
  }))), /* @__PURE__ */ React.createElement(Row, null, /* @__PURE__ */ React.createElement(Col, null, /* @__PURE__ */ React.createElement("h3", null, "Activity"), /* @__PURE__ */ React.createElement(Transactions, {
    user: auth2.user
  })), /* @__PURE__ */ React.createElement(Col, null, /* @__PURE__ */ React.createElement("h3", null, "Send Points"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Points, null)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(TransactionForm, null)))), /* @__PURE__ */ React.createElement(Row, null, /* @__PURE__ */ React.createElement(Col, null, /* @__PURE__ */ React.createElement("h3", null, "Products"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(RewardedPoints, null)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Products, null)))));
  return /* @__PURE__ */ React.createElement("div", {
    className: "app ui main container"
  }, /* @__PURE__ */ React.createElement(CartModal, null), /* @__PURE__ */ React.createElement("div", {
    className: "ui menu"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "header item"
  }, "PointShare"), /* @__PURE__ */ React.createElement("div", {
    className: "right menu"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "item"
  }, /* @__PURE__ */ React.createElement("span", null, auth2.user.email)), /* @__PURE__ */ React.createElement("div", {
    className: "item"
  }, /* @__PURE__ */ React.createElement(CartIcon, null)), /* @__PURE__ */ React.createElement("a", {
    className: "ui item",
    onClick: (e) => handleSignOut(e)
  }, "Sign Out"))), /* @__PURE__ */ React.createElement("div", {
    className: "ui stackable two column grid"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "twelve wide column"
  }, /* @__PURE__ */ React.createElement("h4", {
    className: "ui header"
  }, "Activity"), /* @__PURE__ */ React.createElement(Transactions, {
    user: auth2.user
  })), /* @__PURE__ */ React.createElement("div", {
    className: "four wide column"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "ui card"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "content"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "content"
  }, /* @__PURE__ */ React.createElement(Points, {
    user: auth2.user
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "content"
  }, /* @__PURE__ */ React.createElement(TransactionForm, {
    user: auth2.user
  }))))), /* @__PURE__ */ React.createElement("div", {
    className: "ui divider"
  }), /* @__PURE__ */ React.createElement("div", {
    className: ""
  }, /* @__PURE__ */ React.createElement(RewardedPoints, {
    user: auth2.user
  }), /* @__PURE__ */ React.createElement(Products, {
    user: auth2.user
  })));
}
