import React from "react";

import { Container, Row, Col, Navbar, Button } from "react-bootstrap";

import Orders from "./orders";

import UserTypeSwitch from "./usertypeswitch";

import { useCurrentProfile } from "../stores/profile"; 

export default function FulfillerUI(props) {
    const auth = props.auth;

    //get the profile

    return (
        <Container>
            <Row>
                <Col>
                    <Navigation user={auth.user} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Orders</h3>
                    <Orders />
                </Col>
            </Row>
        </Container>
    );
}

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
                    <Button variant="secondary" onClick={e => handleSignOut(e)}>Sign Out</Button>
                </Navbar.Text> 
            </Navbar.Collapse>
        </Navbar>
    );
}