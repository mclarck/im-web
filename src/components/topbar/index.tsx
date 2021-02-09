import React from "react";
import {Link, NavLink} from "react-router-dom";
import useTopBar from "../../controllers/useTopBar";
import style from "./style.module.css";
import {BiCartAlt} from "react-icons/bi";
import {FiSearch} from "react-icons/fi";
import PopMenu from "../popmenu";
import {Helmet} from "react-helmet";
import _ from "lodash";

const TopBar = (props: any) => {
    const {getUrl, setting, company, hasOrder, cartSize} = useTopBar();
    return (
        <React.Fragment>
            <Helmet>
                <meta charSet="utf-8"/>
                {!_.isEmpty(setting?.title) && <title>{setting?.title}</title>}
            </Helmet>
            <nav className={style.TopBar}>
                <ul>
                    <li>
                        <Link className={style.brand} to={getUrl()}>
                            <div className={style.name}>{company}</div>
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink className={style.link} activeClassName={style.active} to={getUrl("/stocks")}>
                            <div className={style.icon}>
                                <FiSearch/>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={style.link} activeClassName={style.active} to={getUrl("/cart")}>
                            <div className={style.icon}>
                                <BiCartAlt/>
                                {hasOrder && <div className={style.badge}>{cartSize}</div>}
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <PopMenu/>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    );
};

export default TopBar;
