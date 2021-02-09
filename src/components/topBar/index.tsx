import React from "react";
import {Link, NavLink} from "react-router-dom";
import useTopBar from "../../controllers/useTopBar";
import style from "./style.module.css";
import {BiCartAlt} from "react-icons/bi";
import {IoMdSettings} from "react-icons/io";
import PopMenu from "../popMenu";

const TopBar = (props: any) => {
    const {getUrl, company, hasOrder, cartSize} = useTopBar();
    return (
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
                    <NavLink className={style.link} activeClassName={style.active} to={getUrl("/setting")}>
                        <div className={style.icon}>
                            <IoMdSettings/>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <PopMenu/>
                </li>
            </ul>
        </nav>
    );
};

export default TopBar;
