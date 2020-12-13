import React from "react";

import { authenticate } from "../stores/auth";

export class Login extends React.Component {
    render() {
        return (
            <div className="ui middle aligned center aligned grid">
                <div className="column" style={{maxWidth: "450px", paddingTop: "100px"}}>
                    <LoginForm />
                </div>
            </div>
        );
    }
}

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { email: '', password: '', isSubmitting: false, error: null };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ disabled: true });

        authenticate(this.state.email, this.state.password)
            .catch(err => {
                this.setState({ error: "Invalid email and password" });
            })
            .finally(() => { 
                this.setState({ disabled: false });
            });
    }

    render() {
        const disabled = this.state.disabled ? "disabled" : null;
        return (
            <form className={disabled ? "ui loading form" : "ui form"} onSubmit={this.handleSubmit}>
                <h2 className="ui dividing header">Point Share</h2>
                {this.state.error ? <div className="ui error message">{this.state.error}</div> : null}
                <div className="field">
                    <input type="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} disabled={disabled} />
                </div>
                <div className="field">
                    <input type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} disabled={disabled} />
                </div>
                <button className="ui submit primary button" type="submit" disabled={disabled}>Log In</button>
            </form>
        );
    }
}