import React from "react";

import { Container, Row, Col, Navbar, Button } from "react-bootstrap";

import Orders from "./orders";

export default function FulfillerUI(props) {
    const auth = props.auth;
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

function Navigation(props) {
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
                    {props.user.email}
                </Navbar.Text>
                <Navbar.Text>
                    <Button variant="secondary" onClick={e => handleSignOut(e)}>Sign Out</Button>
                </Navbar.Text> 
            </Navbar.Collapse>
        </Navbar>
    );
}