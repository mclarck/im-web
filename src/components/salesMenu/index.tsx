import React from "react";
import {NavLink} from "react-router-dom";
import {MdDirectionsBike} from "react-icons/md";
import {AiOutlineFieldTime} from "react-icons/ai";
import {RiShoppingCart2Line} from "react-icons/ri";
import style from "./style.module.css"
import useSalesMenu from "./useSalesMenu";

const SalesMenu = () => {
    const {getUrl} = useSalesMenu()
    return (
        <nav className={style.Menu}>
            <ul>
                <li></li>
            </ul>
            <ul>
                <li><NavLink className={style.link} activeClassName={style.active}
                             to={getUrl("/pending")}><AiOutlineFieldTime/></NavLink></li>
                <li><NavLink className={style.link} activeClassName={style.active}
                             to={getUrl("/shipping")}><MdDirectionsBike/></NavLink></li>
                <li><NavLink className={style.link} activeClassName={style.active}
                             to={getUrl()}><RiShoppingCart2Line/></NavLink></li>
            </ul>
        </nav>
    )
}

export default SalesMenu