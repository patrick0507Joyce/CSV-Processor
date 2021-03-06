import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

window.authDomain = "xiaohushu.eu.auth0.com";
window.clientId = "5yVp2HtUwO7RZgQ2PJcFvdLUCaITxz7i";

ReactDOM.render(
  <Auth0Provider
    domain={window.authDomain}
    clientId={window.clientId}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
