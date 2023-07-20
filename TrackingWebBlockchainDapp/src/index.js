/*import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./components/App";
import UserComponent from "./components/UserComponent";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <div>
    <Router>
      <Route exact path="/admin">
        <App />
      </Route>
      <Route path="/user">
        <UserComponent />
      </Route>
    </Router>
  </div>,
  document.getElementById("root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

*/

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./components/App";
import UserComponent from "./components/UserComponent";
import * as serviceWorker from "./serviceWorker";

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/user" />
        </Route>
        <Route exact path="/admin" component={App} />
        <Route path="/user" component={UserComponent} />
      </Switch>
    </Router>
  </React.StrictMode>
);

serviceWorker.unregister();


