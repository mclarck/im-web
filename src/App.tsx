import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import TopBar from "./components/topbar";
import useApp from "./controllers/useApp";
import {GqlProvider, RestProvider} from "./services/database";
import {Account, Cart, Login, Logout, Register, Stocks} from "./views";
import {SocketIOProvider} from "./services/io";

function App() {
    const {getPath, getUrl,  rest, apollo} = useApp();
    return (
        <GqlProvider apollo={apollo}>
            <RestProvider rest={rest}>
                <SocketIOProvider>
                    <TopBar/>
                    <Switch>
                        <Route path={getPath("/stocks")} component={Stocks} exact/>
                        <Route path={getPath("/cart")} component={Cart} exact/>
                        <Route path={getPath("/account")} component={Account}/>
                        <Route path={getPath("/login")} component={Login} exact/>
                        <Route path={getPath("/logout")} component={Logout} exact/>
                        <Route path={getPath("/register")} component={Register} exact/>
                        <Route path={getPath()} component={() => <Redirect to={getUrl("stocks")}/>} exact/>
                    </Switch>
                </SocketIOProvider>
            </RestProvider>
        </GqlProvider>
    );
}

export default App;
