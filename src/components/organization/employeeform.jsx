import React, { useState } from "react";

import { Form } from "react-bootstrap";

export default function EmployeeForm({ profile }) {
    const [firstName, setFirstName] = useState(profile.firstName);
    const [lastName, setLastName] = useState(profile.lastName);


    //do a first name last name thing...

    const handleSubmit = e => {
        e.preventDefault();

        console.log("Form submit");
    };



    return (
        <Form onSubmit={e => handleSubmit(e)}>
            <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" value={firstName} onChange={e => setFirstName(e.target.value)}></Form.Control>
                <Form.Text></Form.Text>
            </Form.Group>
        </Form>
    );
}