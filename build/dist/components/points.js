import React from "../../web_modules/react.js";
import {useCurrentPoints} from "../stores/points.js";
export default function Points(props) {
  const points2 = useCurrentPoints();
  if (points2 === null) {
    return /* @__PURE__ */ React.createElement("p", null, "Loading...");
  }
  return /* @__PURE__ */ React.createElement("div", null, "You have ", /* @__PURE__ */ React.createElement("b", null, points2?.points ?? 0), " points to send.");
}
