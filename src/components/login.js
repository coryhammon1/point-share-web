import React from "react";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

export class Login extends React.Component {
    render() {
        return (
            <Container>
                <h1>Login</h1>
                <LoginForm />
            </Container>
        );
    }
}

export class LoginForm extends React.Component {
    render() {
        return (
            <Button variant="contained" color="primary">Login</Button>
        );
    }
}