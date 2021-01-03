import React from "../../web_modules/react.js";
import {combineLatest} from "../../web_modules/rxjs.js";
import {map} from "../../web_modules/rxjs/operators.js";
import {transactionsState, useTransactions} from "../stores/transactions.js";
import {profilesState, useProfiles} from "../stores/profile.js";
import {timeFormat} from "../utils/time.js";
function joinTransactions(transactions2, profiles) {
  const profilesIndex = new Map();
  for (let profile2 of profiles ?? []) {
    profilesIndex.set(profile2.id, profile2);
  }
  return (transactions2 ?? []).map((transaction) => {
    let tx = {...transaction};
    tx.fromUser = profilesIndex.get(tx.from);
    tx.toUser = profilesIndex.get(tx.to);
    return tx;
  });
}
export default function Transactions(props) {
  const txs = useTransactions();
  const profiles = useProfiles();
  const transactions2 = joinTransactions(txs, profiles);
  const transactionElements = transactions2.map((t) => {
    const ts = t.ts ? t.ts.toDate() : new Date();
    const tsDisplay = timeFormat(ts);
    const fromDisplay = t.fromUser ? t.fromUser.displayName : t.from;
    const toDisplay = t.toUser ? t.toUser.displayName : t.to;
    return /* @__PURE__ */ React.createElement("div", {
      className: "item",
      key: t.id
    }, /* @__PURE__ */ React.createElement("div", {
      className: "content"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "right floated content"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "description"
    }, tsDisplay)), /* @__PURE__ */ React.createElement("div", null, fromDisplay, " sent ", t.amount, " point", t.amount > 1 ? "s" : "", " to ", toDisplay, " for ", t.description)));
  });
  return /* @__PURE__ */ React.createElement("div", {
    className: "ui divided relaxed list"
  }, transactionElements);
}
