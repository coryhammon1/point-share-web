import React from "react";

import Transactions from "./transactions";
import Points from "./points";
import TransactionForm from "./transactionform";
import RewardedPoints from "./rewardedpoints";
import Products from "./products";

export default class EmployeeUI extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    render() {
        return (
            <div>
            <div className="ui stackable two column grid">
                <div className="twelve wide column">
                    <h4 className="ui header">Activity</h4>
                    <Transactions user={this.state.user} />
                </div>
                <div className="four wide column">
                    <div className="ui card">
                        <div className="content">
                            <div className="content"><Points user={this.state.user} /></div>
                        </div>
                        <div className="content">
                            <TransactionForm user={this.state.user} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="ui divider"></div>
            <div className="">
                <RewardedPoints user={this.state.user} />
                <Products user={this.state.user} />
            </div>
            </div>
        );
    }
}