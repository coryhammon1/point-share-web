import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { Container, Button, Form, Alert, Spinner } from "react-bootstrap";

import { signUpState } from "./stores/signups";
import { useCurrentUser } from "./stores/auth";

import { create, signInAnonymously } from "./controllers/auth";

import getQueryParams from "./utils/queryparams";
import { useSubscription } from "./utils/rxreact";

function getTokenParam() {
    const params = getQueryParams();
    return params["token"][0];
}

function redirectToHome() {
    window.location.href = "/";
}

function App(props) {
    return (
        <Container>
            <SignUp />
        </Container>
    );
}

function SignUp(props) {
    const currentUser = useCurrentUser();

    useEffect(() => {
        if (currentUser === null) {
            signInAnonymously()
                .catch(err => {
                    console.error(err);
                });
        }
    });

    const signUp = useSubscription(signUpState(getTokenParam()));

    if (!currentUser) {
        return <p>Loading...</p>;
    }

    const handleReturn = e => {
        e.preventDefault();
        redirectToHome();
    };

    if (!currentUser.isAnonymous) {
        return (
            <div>
                <h1>Account Already Active</h1>
                <p>You already have an active account.</p>
                <Button onClick={handleReturn}>
                    Return to app
                </Button>
            </div>
        );
    }

    if (!signUp) {
        return <p>Loading...</p>;
    }

    const profileId = signUp?.profileId;

    if (!profileId) {
        return (
            <div>
                <h1>Invalid token</h1>
                <p>Reach out to your organization's administrator to send a new invitation.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <div>
                <SignUpForm signUp={signUp} currentUser={currentUser} />
            </div>
        </div>
    );
}

//TODO: add better validation to passwords
//TODO: add preferred sizing, address, etc.
function SignUpForm({ signUp, currentUser }) {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState(null);
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        const form = e.currentTarget;

        setValidated(true);
        setError(null);

        if (form.checkValidity() === false) {
            e.stopPropagation();
            return;
        }

        if (password !== confirm) {
            setError("Passwords do not match");
            e.stopPropagation();
            return;
        }

        setIsLoading(true);

        create(signUp.email, password, signUp.profileId, currentUser.uid, signUp.id)
            .then(user => {
                redirectToHome();
            })
            .catch(err => {
                console.error(err);
                setError("Failed to create account");
            })
            .finally(() => {
                setIsLoading(false);
            });

        console.log("submit");
    }

    return (
        <Form noValidate validated={validated} onSubmit={e => handleSubmit(e)}>
            {error ? <Alert variant="danger">{error}</Alert> : null}
            <fieldset disabled={isLoading}>
                <Form.Group controlId="formPassword">
                    <Form.Label>Enter a new password</Form.Label>
                    <Form.Control type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                    <Form.Control.Feedback type="invalid">
                        Password is required.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formPasswordConfirm">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" required value={confirm} onChange={e => setConfirm(e.target.value)} />
                    <Form.Control.Feedback type="invalid">
                        Confirmation is required.
                    </Form.Control.Feedback>
                </Form.Group>
                <p>Preferred t-shirt size</p>
                <p>Preferred pants size</p>
                <p>Shipping address</p>
                <p>I'll set this up later.</p>
                {isLoading ?
                    <Button>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            />
                    </Button>
                    :
                    <Button type="submit">Set up account</Button>
                }
            </fieldset>
        </Form>
    );
}

(function() {
    const domContainer = document.querySelector("#app");
    ReactDOM.render(<App />, domContainer);
})();