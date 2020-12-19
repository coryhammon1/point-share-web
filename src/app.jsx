import React from "react";
import ReactDOM from "react-dom";

import { Observable } from "rxjs";

import { authState } from "./stores/auth";
import { currentProfileState } from "./stores/profile";

import { Login } from "./components/login";
import EmployeeUI from "./components/employeeui";

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

        const profile = this.state.profile;

        if (!profile) {
            return <div>Loading...</div>;
        }

        let ui = null;

        if (profile.type === "FULFILLER") {
            ui = <div>Fulfiller</div>;
        } else {
            ui = <EmployeeUI />;
        }

        //ADD cart icon

        return (
            <div className="app ui main container">
                <div className="ui menu">
                    <div className="header item">
                        PointShare
                    </div>
                    <div className="right menu">
                        <div className="item">
                            <span>{auth.user.email}</span>
                        </div>
                        <div className="item">
                            
                        </div>
                        <a className="ui item" onClick={this.signOut}>
                            Sign Out
                        </a>
                    </div>
                </div>
                {ui}
            </div>
        );
    }
}

(function() {
    const domContainer = document.querySelector("#app");
    ReactDOM.render(<App />, domContainer);
})();

