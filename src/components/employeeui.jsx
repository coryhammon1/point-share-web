import React from "react";

import { Container, Navbar, Button, Row, Col } from "react-bootstrap";

import Transactions from "./transactions";
import Points from "./points";
import TransactionForm from "./transactionform";
import RewardedPoints from "./rewardedpoints";
import Products from "./products";
import { CartIcon, CartModal } from "./cart";
import UserTypeSwitch from "./usertypeswitch";

import { useCurrentProfile } from "../stores/profile";

import { signOut } from "../controllers/auth";

function Navigation({ user }) {
    const currentProfile = useCurrentProfile();

    const handleSignOut = e => {
        e.preventDefault();
        signOut();
    }

    return (
        <Navbar bg="light" variant="light">
            <Navbar.Brand>Point Share</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    {user.email}
                </Navbar.Text>
                {currentProfile?.admin ? <UserTypeSwitch profile={currentProfile} /> : null}
                <Navbar.Text>
                    <CartIcon />
                </Navbar.Text>
                <Navbar.Text>
                    <Button variant="secondary" onClick={e => handleSignOut(e)}>Sign Out</Button>
                </Navbar.Text> 
            </Navbar.Collapse>
        </Navbar>
    );
}

export default function EmployeeUI(props) {
    const auth = props.auth;

    const handleSignOut = e => {
        e.preventDefault();
        signOut();
    };

    return (
        <Container >
            <CartModal />
            <Row>
                <Col>
                    <Navigation user={auth.user} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Activity</h3>
                    <Transactions user={auth.user} />
                </Col>
                <Col>
                    <h3>Send Points</h3>
                    <div>
                        <Points />
                    </div>
                    <div>
                        <TransactionForm />
                    </div> 
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Products</h3>
                    <div>
                        <RewardedPoints />
                    </div>
                    <div>
                        <Products />
                    </div>
                </Col>
            </Row>
        </Container>
    );

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

