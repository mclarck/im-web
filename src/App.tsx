import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import TopBar from "./components/topBar";
import useApp from "./controllers/useApp";
import {GqlProvider, RestProvider} from "./services/database";
import {Account, Chats, Login, Logout, OverView, Register, Sales, Setting, Stocks} from "./views";
import SideMenu from "./components/sideMenu";
import {SocketIOProvider} from "./services/io";

function App() {
    const {getPath, getUrl, rest, apollo} = useApp();
    return (
        <GqlProvider apollo={apollo}>
            <RestProvider rest={rest}>
                <SocketIOProvider>
                    <TopBar/>
                    <div id="layout">
                        <SideMenu/>
                        <div id="content">
                            <Switch>
                                <Route path={getPath("/overview")} component={OverView} exact/>
                                <Route path={getPath("/chats")} component={Chats} exact/>
                                <Route path={getPath("/setting")} component={Setting} exact/>
                                <Route path={getPath("/stocks")} component={Stocks} exact/>
                                <Route path={getPath("/sales")} component={Sales}/>
                                <Route path={getPath("/account")} component={Account}/>
                                <Route path={getPath("/login")} component={Login} exact/>
                                <Route path={getPath("/logout")} component={Logout} exact/>
                                <Route path={getPath("/register")} component={Register} exact/>
                                <Route path={getPath("/")} component={() => <Redirect to={getUrl("/overview")}/>}
                                       exact/>
                            </Switch>
                        </div>
                    </div>
                </SocketIOProvider>
            </RestProvider>
        </GqlProvider>
    );
}

export default App;
