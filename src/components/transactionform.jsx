import React, { useState } from "react";

import { Form, Alert, Button } from "react-bootstrap";

import { useCurrentUser } from "../stores/auth";
import { useProfiles } from "../stores/profile";

import { sendPoints } from "../controllers/points";

export default function TransactionForm(props) {
    const [amount, setAmount] = useState(0);
    const [toId, setToId] = useState("");
    const [description, setDescription] = useState("");
    
    const currentUser = useCurrentUser();
    const currentUserId = currentUser ? currentUser.uid : null;

    const profiles = useProfiles();

    let peers = [];
    if (profiles) {
        peers = profiles.filter(profile => profile.id !== currentUserId);
    }

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        const form = e.target.value;

        setDisabled(true);

        sendPoints(amount, currentUserId, toId, description)
            .then(result => {
                setDisabled(false);
                setSuccess(true);
                setAmount(0);
                setToId("");
                setDescription("");
                setError(null);
            })
            .catch(err => {
                setDisabled(false);
                setError(err.toString());
            });
    };

    const isValid = amount > 0;

    return (
        <Form onSubmit={e => handleSubmit(e)}>
            {error ? <Alert variant="danger">{error}</Alert> : null}
            {success ? <Alert variant="success">Points sent!</Alert> : null}
            <fieldset disabled={disabled}>
                <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" value={amount} onChange={e => setAmount(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Send to</Form.Label>
                    <Form.Control as="select" value={toId} onChange={e => setToId(e.target.value)}>
                        <option key='' value=''></option>
                        {peers.map(peer => <option key={peer.id} value={peer.id}>{peer.displayName}</option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Note</Form.Label>
                    <Form.Control type="textarea" value={description} onChange={e => setDescription(e.target.value)}></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!isValid}>Send</Button>
            </fieldset>
        </Form>
    );

    return (
        <form className="ui form" onSubmit={e => handleSubmit(e)}>
            <div>{error ? <div className="ui negative message">{error}</div> : null}</div>
            <div>{success ? <div className="ui positive message">Points sent!</div> : null}</div>
            <div className="field">
                <label>Amount</label>
                <div className="ui input">
                    <input type="number" placeholder="amount" value={amount} onChange={e => setAmount(e.target.value)} disabled={disabled} />
                </div>
            </div>
            <div className="field">
                <label>To</label>
                <select className="ui selection dropdown" value={toId} onChange={e => setToId(e.target.value)} disabled={disabled}>
                    <option key='' value=''></option>
                {peers.map(peer => <option key={peer.id} value={peer.id}>{peer.displayName}</option>)}
                </select>
            </div>
            <div className="field">
                <label>Message</label>
                <div className="ui input">
                    <input type="text" placeholder="Type a message here" value={description} onChange={e => setDescription(e.target.value)} disabled={disabled} />
                </div>
            </div>
            <button className="ui button" type="submit" disabled={disabled}>Submit</button>
        </form>
    );
}