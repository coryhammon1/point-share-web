import React, { useState } from "react";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { authenticate } from "../stores/auth";

export function Login(props) {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <LoginForm />
            </Row>
        </Container>
    );
}

export function LoginForm(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        authenticate(email, password)
            .catch(err => {
                setError("Invalid email or password");
            })
            .finally(() => { 
                setIsSubmitting(false);
            });
    };

    const disabled = isSubmitting ? "disabled" : null;

    return (
        <Form onSubmit={e => handleSubmit(e)}>
            <h1>Point Share</h1>
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    );

    return (
        <form className={disabled ? "ui loading form" : "ui form"} onSubmit={e => handleSubmit(e)}>
            <h2 className="ui dividing header">Point Share</h2>
            {error ? <div className="ui error message">{error}</div> : null}
            <div className="field">
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} disabled={disabled} />
            </div>
            <div className="field">
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} disabled={disabled} />
            </div>
            <button className="ui submit primary button" type="submit" disabled={disabled}>Log In</button>
        </form>
    );
}