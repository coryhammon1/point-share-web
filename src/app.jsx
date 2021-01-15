import React from "react";
import ReactDOM from "react-dom";

import { authState } from "./stores/auth";
import { currentProfileState } from "./stores/profile";

import { Login } from "./components/login";
import EmployeeUI from "./components/employeeui";
import FulfillerUI from "./components/fulfillerui";
import OrgAdminUI from "./components/orgadminui";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            auth: { initialized: false },
            profile: null
        };
    }

    componentDidMount() {
        this.authSub = authState.subscribe(auth => {
            this.setState({ auth });
        });

        this.currentProfileSub = currentProfileState.subscribe(profile => {
            this.setState({ profile });
        });
    }

    componentWillUnmount() {
        this.authSub.unsubscribe();
    }

    render() {
        const auth = this.state.auth;

        if (!auth.initialized) {
            return <div>Loading...</div>;
        }

        if (!auth.user) {
            return <Login />;
        }

        if (auth.user.isAnonymous) {
            return <Login />;
        }

        const profile = this.state.profile;

        if (!profile) {
            return <div>Loading...</div>;
        }

        if (profile.type === "FULFILLER") {
            return <FulfillerUI auth={auth} />;
        } else if (profile.type === "ORG_ADMIN") {
            return <OrgAdminUI auth={auth} />;
        } else {
            return <EmployeeUI auth={auth} />;
        }
    }
}

(function() {
    const domContainer = document.querySelector("#app");
    ReactDOM.render(<App />, domContainer);
})();

