import React from "react";

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
            <form noValidate autoComplete="off">
                <TextField id="email" label="Email" required />
                <TextField id="password" label="Password" type="password" required />
            </form>
        );
    }
}