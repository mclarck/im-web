import React from "react"
import style from "./style.module.css"
import {NavLink} from "react-router-dom";
import {FaUsersCog, FaUsers} from "react-icons/fa";
import {BsFolder} from "react-icons/bs";
import {RiDonutChartFill} from "react-icons/ri";
import useSideMenu from "../../controllers/useSideMenu";
import {RiShoppingCart2Line} from "react-icons/ri";
import {BiSupport} from "react-icons/bi";

const SideMenu = (props: any) => {
    const {getUrl} = useSideMenu()
    return (
        <nav className={style.SideMenu}>
            <ul>
                <li>
                    <NavLink className={style.link} activeClassName={style.active} to={getUrl("/overview")}>
                        <div className={style.icon}>
                            <RiDonutChartFill/>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={style.link} activeClassName={style.active} to={getUrl("/stocks")}>
                        <div className={style.icon}>
                            <BsFolder/>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={style.link} activeClassName={style.active} to={getUrl("/sales")}>
                        <div className={style.icon}>
                            <RiShoppingCart2Line/>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={style.link} activeClassName={style.active} to={getUrl("/chats")}>
                        <div className={style.icon}>
                            <BiSupport/>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={style.link} activeClassName={style.active} to={getUrl("/clients")}>
                        <div className={style.icon}>
                            <FaUsers/>
                        </div>
                    </NavLink>
                </li>
            </ul>
            <ul>
                <li>
                    <NavLink className={style.link} activeClassName={style.active} to={getUrl("/users")}>
                        <div className={style.icon}>
                            <FaUsersCog/>
                        </div>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default SideMenu