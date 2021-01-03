import React, {useState} from "../../web_modules/react.js";
import {Form, Alert, Button} from "../../web_modules/react-bootstrap.js";
import {useCurrentUser} from "../stores/auth.js";
import {useProfiles} from "../stores/profile.js";
import {sendPoints} from "../controllers/points.js";
export default function TransactionForm(props) {
  const [amount, setAmount] = useState(0);
  const [toId, setToId] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useCurrentUser();
  const currentUserId = currentUser ? currentUser.uid : null;
  const profiles = useProfiles();
  let peers = [];
  if (profiles) {
    peers = profiles.filter((profile2) => profile2.id !== currentUserId);
  }
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target.value;
    setDisabled(true);
    sendPoints(amount, currentUserId, toId, description).then((result) => {
      setDisabled(false);
      setSuccess(true);
      setAmount(0);
      setToId("");
      setDescription("");
      setError(null);
    }).catch((err) => {
      setDisabled(false);
      setError(err.toString());
    });
  };
  const isValid = amount > 0;
  return /* @__PURE__ */ React.createElement(Form, {
    onSubmit: (e) => handleSubmit(e)
  }, error ? /* @__PURE__ */ React.createElement(Alert, {
    variant: "danger"
  }, error) : null, success ? /* @__PURE__ */ React.createElement(Alert, {
    variant: "success"
  }, "Points sent!") : null, /* @__PURE__ */ React.createElement("fieldset", {
    disabled
  }, /* @__PURE__ */ React.createElement(Form.Group, null, /* @__PURE__ */ React.createElement(Form.Label, null, "Amount"), /* @__PURE__ */ React.createElement(Form.Control, {
    type: "number",
    value: amount,
    onChange: (e) => setAmount(e.target.value)
  })), /* @__PURE__ */ React.createElement(Form.Group, null, /* @__PURE__ */ React.createElement(Form.Label, null, "Send to"), /* @__PURE__ */ React.createElement(Form.Control, {
    as: "select",
    value: toId,
    onChange: (e) => setToId(e.target.value)
  }, /* @__PURE__ */ React.createElement("option", {
    key: "",
    value: ""
  }), peers.map((peer) => /* @__PURE__ */ React.createElement("option", {
    key: peer.id,
    value: peer.id
  }, peer.displayName)))), /* @__PURE__ */ React.createElement(Form.Group, null, /* @__PURE__ */ React.createElement(Form.Label, null, "Note"), /* @__PURE__ */ React.createElement(Form.Control, {
    type: "textarea",
    value: description,
    onChange: (e) => setDescription(e.target.value)
  })), /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    type: "submit",
    disabled: !isValid
  }, "Send")));
  return /* @__PURE__ */ React.createElement("form", {
    className: "ui form",
    onSubmit: (e) => handleSubmit(e)
  }, /* @__PURE__ */ React.createElement("div", null, error ? /* @__PURE__ */ React.createElement("div", {
    className: "ui negative message"
  }, error) : null), /* @__PURE__ */ React.createElement("div", null, success ? /* @__PURE__ */ React.createElement("div", {
    className: "ui positive message"
  }, "Points sent!") : null), /* @__PURE__ */ React.createElement("div", {
    className: "field"
  }, /* @__PURE__ */ React.createElement("label", null, "Amount"), /* @__PURE__ */ React.createElement("div", {
    className: "ui input"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "number",
    placeholder: "amount",
    value: amount,
    onChange: (e) => setAmount(e.target.value),
    disabled
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "field"
  }, /* @__PURE__ */ React.createElement("label", null, "To"), /* @__PURE__ */ React.createElement("select", {
    className: "ui selection dropdown",
    value: toId,
    onChange: (e) => setToId(e.target.value),
    disabled
  }, /* @__PURE__ */ React.createElement("option", {
    key: "",
    value: ""
  }), peers.map((peer) => /* @__PURE__ */ React.createElement("option", {
    key: peer.id,
    value: peer.id
  }, peer.displayName)))), /* @__PURE__ */ React.createElement("div", {
    className: "field"
  }, /* @__PURE__ */ React.createElement("label", null, "Message"), /* @__PURE__ */ React.createElement("div", {
    className: "ui input"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "text",
    placeholder: "Type a message here",
    value: description,
    onChange: (e) => setDescription(e.target.value),
    disabled
  }))), /* @__PURE__ */ React.createElement("button", {
    className: "ui button",
    type: "submit",
    disabled
  }, "Submit"));
}
