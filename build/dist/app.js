import React from "../web_modules/react.js";
import ReactDOM from "../web_modules/react-dom.js";
import {authState} from "./stores/auth.js";
import {currentProfileState} from "./stores/profile.js";
import {Login} from "./components/login.js";
import EmployeeUI from "./components/employeeui.js";
import FulfillerUI from "./components/fulfillerui.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {initialized: false},
      profile: null
    };
  }
  componentDidMount() {
    this.authSub = authState.subscribe((auth2) => {
      this.setState({auth: auth2});
    });
    this.currentProfileSub = currentProfileState.subscribe((profile2) => {
      this.setState({profile: profile2});
    });
  }
  componentWillUnmount() {
    this.authSub.unsubscribe();
  }
  render() {
    const auth2 = this.state.auth;
    if (!auth2.initialized) {
      return /* @__PURE__ */ React.createElement("div", null, "Loading...");
    }
    if (!auth2.user) {
      return /* @__PURE__ */ React.createElement(Login, null);
    }
    const profile2 = this.state.profile;
    if (!profile2) {
      return /* @__PURE__ */ React.createElement("div", null, "Loading...");
    }
    if (profile2.type === "FULFILLER") {
      return /* @__PURE__ */ React.createElement(FulfillerUI, {
        auth: auth2
      });
    } else {
      return /* @__PURE__ */ React.createElement(EmployeeUI, {
        auth: auth2
      });
    }
  }
}
(function() {
  const domContainer = document.querySelector("#app");
  ReactDOM.render(/* @__PURE__ */ React.createElement(App, null), domContainer);
})();
