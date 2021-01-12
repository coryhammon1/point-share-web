import React, { useState } from "react";

import { Form, Button, Spinner, Alert } from "react-bootstrap";

import { create, update } from "../../controllers/users";

export default function EmployeeForm({ profile, isEditing, onComplete }) {
    const [firstName, setFirstName] = useState(profile.firstName);
    const [lastName, setLastName] = useState(profile.lastName);
    const [email, setEmail] = useState(profile.email);
    const [isAdmin, setIsAdmin] = useState(profile.type === "ORG_ADMIN");
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            setIsLoading(true);

            const employee = {
                orgId: profile.orgId,
                firstName,
                lastName,
                email,
                type: isAdmin ? "ORG_ADMIN" : "EMPLOYEE"
            };

            let promise = isEditing ? update(employee) : create(employee);

            promise
                .then(result => {
                    console.log("done");
                    if (onComplete) {
                        onComplete(employee);
                    }
                })
                .catch(err => {
                    console.error(err);
                    setError(err.message);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }

        setValidated(true);
    };

    return (
        <Form noValidate validated={validated} onSubmit={e => handleSubmit(e)}>
            <fieldset disabled={isLoading}>
            {error ? <Alert variant="danger">{error}</Alert> : null}
            <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" required value={firstName} onChange={e => setFirstName(e.target.value)}></Form.Control>
                <Form.Text></Form.Text>
                <Form.Control.Feedback type="invalid">
                    First name is required.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" required value={lastName} onChange={e => setLastName(e.target.value)}></Form.Control>
                <Form.Text></Form.Text>
                <Form.Control.Feedback type="invalid">
                    Last name is required.
                </Form.Control.Feedback>
            </Form.Group>
            {!isEditing ?
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type="email" value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
                    <Form.Text></Form.Text>
                    <Form.Control.Feedback type="invalid">
                        A valid email address is required.
                    </Form.Control.Feedback>
                </Form.Group>
                : null
            }
            <Form.Group controlId="formIsAdmin">
                <Form.Check type="checkbox" label="Is Admin" value={isAdmin} onChange={e => setIsAdmin(e.target.value)} />
            </Form.Group>
            {isLoading ?
                <Button variant="primary" type="submit">
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />
                </Button>
                :
                <Button variant="primary" type="submit">
                {isEditing ? "Update" : "Add"}
                </Button>
            }
            
            {!isEditing ? <p>A sign up email will be sent to the email address above.</p> : null}
            </fieldset>
        </Form>
    );
}