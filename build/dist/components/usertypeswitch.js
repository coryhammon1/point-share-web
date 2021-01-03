import React from "../../web_modules/react.js";
import {NavDropdown} from "../../web_modules/react-bootstrap.js";
import {setUserType} from "../controllers/admin.js";
export default function({profile}) {
  const userType = profile?.type || "EMPLOYEE";
  const handleUpdateType = (e, type) => {
    e.preventDefault();
    setUserType(profile.id, type).catch((err) => {
      console.error(err);
    });
  };
  return /* @__PURE__ */ React.createElement(NavDropdown, {
    title: userType
  }, /* @__PURE__ */ React.createElement(NavDropdown.Item, {
    onClick: (e) => handleUpdateType(e, "EMPLOYEE")
  }, "Employee"), /* @__PURE__ */ React.createElement(NavDropdown.Item, {
    onClick: (e) => handleUpdateType(e, "FULFILLER")
  }, "Fulfiller"));
}
