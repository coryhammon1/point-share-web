import React, { useState, useEffect } from "react";

import { authenticate } from "../stores/auth";

export function Login(props) {
    return (
        <div className="ui middle aligned center aligned grid">
            <div className="column" style={{maxWidth: "450px", paddingTop: "100px"}}>
                <LoginForm />
            </div>
        </div>
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