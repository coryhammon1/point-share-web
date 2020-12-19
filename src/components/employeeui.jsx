import React from "react";

import Transactions from "./transactions";
import Points from "./points";
import TransactionForm from "./transactionform";
import RewardedPoints from "./rewardedpoints";
import Products from "./products";
import { CartIcon, CartModal } from "./cart";

import { signOut } from "../controllers/auth";

export default function EmployeeUI(props) {
    const auth = props.auth;

    const handleSignOut = e => {
        e.preventDefault();
        signOut();
    };

    return (
        <div className="app ui main container">
            <CartModal />
            <div className="ui menu">
                <div className="header item">
                    PointShare
                </div>
                <div className="right menu">
                    <div className="item">
                        <span>{auth.user.email}</span>
                    </div>
                    <div className="item">
                        <CartIcon />
                    </div>
                    <a className="ui item" onClick={e => handleSignOut(e)}>
                        Sign Out
                    </a>
                </div>
            </div>
            <div className="ui stackable two column grid">
                <div className="twelve wide column">
                    <h4 className="ui header">Activity</h4>
                    <Transactions user={auth.user} />
                </div>
                <div className="four wide column">
                    <div className="ui card">
                        <div className="content">
                            <div className="content"><Points user={auth.user} /></div>
                        </div>
                        <div className="content">
                            <TransactionForm user={auth.user} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="ui divider"></div>
            <div className="">
                <RewardedPoints user={auth.user} />
                <Products user={auth.user} />
            </div>
        </div>
    );
}