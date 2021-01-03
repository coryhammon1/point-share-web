import React from "react";

import { NavDropdown } from "react-bootstrap";

import { setUserType } from "../controllers/admin";

export default function({ profile }) {
    const userType = profile?.type || "EMPLOYEE";

    const handleUpdateType = (e, type) => {
        e.preventDefault();

        setUserType(profile.id, type)
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <NavDropdown title={userType}>
            <NavDropdown.Item onClick={e => handleUpdateType(e, "EMPLOYEE")}>Employee</NavDropdown.Item>
            <NavDropdown.Item onClick={e => handleUpdateType(e, "FULFILLER")}>Fulfiller</NavDropdown.Item>
        </NavDropdown>
    )
}