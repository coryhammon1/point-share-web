import React, {useState} from "../../web_modules/react.js";
import {Container, Row, Col, Form, Button} from "../../web_modules/react-bootstrap.js";
import {authenticate} from "../stores/auth.js";
export function Login(props) {
  return /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(Row, {
    className: "justify-content-md-center"
  }, /* @__PURE__ */ React.createElement(LoginForm, null)));
}
export function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    authenticate(email, password).catch((err) => {
      setError("Invalid email or password");
    }).finally(() => {
      setIsSubmitting(false);
    });
  };
  const disabled = isSubmitting ? "disabled" : null;
  return /* @__PURE__ */ React.createElement(Form, {
    onSubmit: (e) => handleSubmit(e)
  }, /* @__PURE__ */ React.createElement("h1", null, "Point Share"), /* @__PURE__ */ React.createElement(Form.Group, {
    controlId: "email"
  }, /* @__PURE__ */ React.createElement(Form.Label, null, "Email"), /* @__PURE__ */ React.createElement(Form.Control, {
    type: "email",
    placeholder: "Email",
    value: email,
    onChange: (e) => setEmail(e.target.value)
  })), /* @__PURE__ */ React.createElement(Form.Group, {
    controlId: "password"
  }, /* @__PURE__ */ React.createElement(Form.Label, null, "Password"), /* @__PURE__ */ React.createElement(Form.Control, {
    type: "password",
    placeholder: "Password",
    value: password,
    onChange: (e) => setPassword(e.target.value)
  })), /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    type: "submit"
  }, "Submit"));
  return /* @__PURE__ */ React.createElement("form", {
    className: disabled ? "ui loading form" : "ui form",
    onSubmit: (e) => handleSubmit(e)
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "ui dividing header"
  }, "Point Share"), error ? /* @__PURE__ */ React.createElement("div", {
    className: "ui error message"
  }, error) : null, /* @__PURE__ */ React.createElement("div", {
    className: "field"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "email",
    placeholder: "Email",
    value: email,
    onChange: (e) => setEmail(e.target.value),
    disabled
  })), /* @__PURE__ */ React.createElement("div", {
    className: "field"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "password",
    placeholder: "Password",
    value: password,
    onChange: (e) => setPassword(e.target.value),
    disabled
  })), /* @__PURE__ */ React.createElement("button", {
    className: "ui submit primary button",
    type: "submit",
    disabled
  }, "Log In"));
}
