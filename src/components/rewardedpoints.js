import React, { useState, useEffect } from "react";

import { useCurrentPoints } from "../stores/points";

let i = 0;

export default function RewardedPoints(props) {
    const points = useCurrentPoints();

    if (!points) {
        return <p>Loading...</p>;
    }

    return <p>You have <b>{points?.rewarded ?? 0}</b> to spend.</p>;
}