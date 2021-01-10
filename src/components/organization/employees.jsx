import React, { useState } from "react";

import { Table, Button, Modal } from "react-bootstrap";

import { useOrganizationProfiles } from "../../stores/profile";
import { usePoints } from "../../stores/points";

import EmployeeForm from "./employeeform";

export default function({ organization }) {
    console.log(organization);

    const profiles = useOrganizationProfiles(organization.id);

    const newEmployee = {
        orgId: organization.id,
        firstName: ""
    };

    const [showEmployeeForm, setShowEmployeeForm] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(newEmployee);

    //get points per user?

    console.log(profiles);

    if (profiles === null) {
        return <p>Loading...</p>;
    }

    const handleAddEmployee = e => {
        e.preventDefault();        
        setShowEmployeeForm(true);
    }

    const handleEmployeeFormClose = () => {
        setShowEmployeeForm(false);
    }

    return (
        <div>
            <Modal show={showEmployeeForm} onHide={handleEmployeeFormClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EmployeeForm profile={editingEmployee} />
                </Modal.Body>
                <Modal.Footer>Footer</Modal.Footer>
            </Modal>
            <Button onClick={e => handleAddEmployee(e)}>Add Employee</Button>
            <Table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Administrator</th>
                        <th>Sendable Points</th>
                        <th>Rewarded Points</th>
                    </tr>
                </thead>
                <tbody>
                {profiles.map(profile => <EmployeeRow key={profile.id} profile={profile} />)}
                </tbody>
            </Table>
        </div>
        
    );
}

function EmployeeRow({ profile }) {
    const points = usePoints(profile.id);

    const isOrgAdmin = profile.type === "ORG_ADMIN";

    return (
        <tr>
            <td>{profile.firstName}</td>
            <td>{profile.lastName}</td>
            <td>{profile.email}</td>
            <td>{isOrgAdmin ? "Yes" : "No"}</td>
            <td>{points?.points || 0}</td>
            <td>{points?.rewarded || 0}</td>
        </tr>
    );
}