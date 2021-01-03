import React from "../../web_modules/react.js";
import {useCurrentPoints} from "../stores/points.js";
export default function RewardedPoints(props) {
  const points2 = useCurrentPoints();
  if (!points2) {
    return /* @__PURE__ */ React.createElement("p", null, "Loading...");
  }
  return /* @__PURE__ */ React.createElement("p", null, "You have ", /* @__PURE__ */ React.createElement("b", null, points2?.rewarded ?? 0), " to spend.");
}
