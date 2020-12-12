import React from "react";
import ReactDOM from "react-dom";

import { Observable } from "rxjs";

import { userState } from "./stores/auth";

import { Login } from "./components/login";

userState.subscribe(user => {
    if (!user) {
        console.log("Not logged in");
        return;
    }

    console.log(user.uid);
});

class App extends React.Component {
    render() {
        return <Login />;
    }
}

//now separate out components

const domContainer = document.querySelector("#app");
ReactDOM.render(<App />, domContainer);