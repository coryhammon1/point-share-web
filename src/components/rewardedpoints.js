import React from "react";

import { map } from "rxjs/operators";

import { currentPointsState } from "../stores/points";

const componentState = currentPointsState.pipe(map(points => {
    return { rewarded: points?.rewarded };
}));

export default class RewardedPoints extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rewarded: null
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
        if (this.state.rewarded === null) {
            return <p>Loading rewarded points...</p>
        }

        return (
            <p>You have <b>{this.state.rewarded}</b> to spend.</p>
        );
    }
}