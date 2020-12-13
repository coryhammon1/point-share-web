import React from "react";

import { map } from "rxjs/operators";

import { currentPointsState } from "../stores/points"; 

const componentState = currentPointsState.pipe(map(points => {
    return { points };
}));

export default class Points extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            points: null
        };
    }

    componentDidMount() {
        this.sub = componentState.subscribe(state => {
            this.setState(state);
        });
    }

    componentWillUnmount() {
        this.sub.unsubscribe();
    }

    render() {
        const points = this.state.points;

        if (points === null) {
            return <p>Loading points...</p>;
        }

        const sendPoints = points.points || 0;

        return (
            <div className="">
                You have <b>{sendPoints}</b> points to send.
            </div>
        );
    }
}