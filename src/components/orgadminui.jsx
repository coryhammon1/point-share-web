import React from "react";

import { Container, Row, Col, Navbar, Button } from "react-bootstrap";

import { useCurrentProfile } from "../stores/profile"; 
import { useCurrentOrganization } from "../stores/organization";

import UserTypeSwitch from "./usertypeswitch";

import Employees from "./organization/employees";

export default function({ auth }) {
    const organization = useCurrentOrganization();

    if (organization === null) {
        return <p>Loading...</p>;
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Navigation user={auth.user} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>{organization.displayName}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Employees</h3>
                    <Employees organization={organization} />
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