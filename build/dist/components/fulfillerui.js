import React from "../../web_modules/react.js";
import {Container, Row, Col, Navbar, Button} from "../../web_modules/react-bootstrap.js";
import Orders from "./orders.js";
import UserTypeSwitch from "./usertypeswitch.js";
import {useCurrentProfile} from "../stores/profile.js";
export default function FulfillerUI(props) {
  const auth = props.auth;
  return /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(Row, null, /* @__PURE__ */ React.createElement(Col, null, /* @__PURE__ */ React.createElement(Navigation, {
    user: auth.user
  }))), /* @__PURE__ */ React.createElement(Row, null, /* @__PURE__ */ React.createElement(Col, null, /* @__PURE__ */ React.createElement("h3", null, "Orders"), /* @__PURE__ */ React.createElement(Orders, null))));
}
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
  }) : null, /* @__PURE__ */ React.createElement(Navbar.Text, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "secondary",
    onClick: (e) => handleSignOut(e)
  }, "Sign Out"))));
}
