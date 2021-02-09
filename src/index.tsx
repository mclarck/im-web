import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import 'react-notifications-component/dist/theme.css'
import "im-ui-core/dist/index.css"
import "im-ui-chat/dist/index.css"
import "./index.css";
import App from "./App";
import {Error404} from "./components/errors";
import 'moment/locale/fr'
import 'moment/locale/es'
import 'moment/locale/pt'

ReactDOM.render(
    <React.StrictMode>
        <Router basename="/market">
            <Switch>
                <Route path="/:locale/:company" component={App}/>
                <Route path="/" component={Error404} exact/>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
