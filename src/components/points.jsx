import React from "react";

import { useCurrentPoints } from "../stores/points";

export default function Points(props) {
    const points = useCurrentPoints();

    if (points === null) {
        return <p>Loading...</p>;
    }

    return <div>You have <b>{points?.points ?? 0}</b> points to send.</div>
}