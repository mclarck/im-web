import React from "react";
import style from "./style.module.css";
import useAccount from "../../controllers/useAccount";
import {NavLink, Redirect, Route, Switch} from "react-router-dom";
import Chat from "../chat";
import Orders from "../orders";
import Profile from "../profile";
import Login from "../login";

const Account = (props: any) => {
    const {t, onLogged, getUrl, getPath, isAuth} = useAccount()
    if (!isAuth) return <Login onLogged={onLogged}/>
    return (
        <div className={style.Account}>
            <div className={style.heading}>
                <nav className={style.tabs}>
                    <ul>
                        <li>
                            <NavLink
                                className={style.tab}
                                activeClassName={style.active}
                                to={getUrl("/chat")}
                            >
                                {t("Chat")}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={style.tab}
                                activeClassName={style.active}
                                to={getUrl("/orders")}
                            >
                                {t("Orders")}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={style.tab}
                                activeClassName={style.active}
                                to={getUrl("/profile")}
                            >
                                {t("Account")}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={style.body}>
                <Switch>
                    <Route path={getPath("/profile")} component={Profile} exact/>
                    <Route path={getPath("/chat")} component={Chat} exact/>
                    <Route path={getPath("/orders")} component={Orders} exact/>
                    <Route path={getPath("/")} component={() => <Redirect to={getUrl("/profile")}/>} exact/>
                </Switch>
            </div>
        </div>
    );
};
export default Account;
