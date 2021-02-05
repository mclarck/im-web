import React from "react"
import style from "./style.module.css"
import {HiDotsVertical} from "react-icons/hi"
import {Link} from "react-router-dom"
import usePopMenu from "./usePopMenu";

const PopMenu = (props: any) => {
    const {t, getUrl, show, shown} = usePopMenu()
    return (
        <div className={style.PopMenu}>
            <button className={style.icon} onClick={show}><HiDotsVertical/></button>
            {shown &&
                <nav className={style.overlay}>
                    <ul className={style.items}>
                        <li className={style.item}>
                            <Link className={style.link} to={getUrl("/account/profile")}>{t("Profile")}</Link>
                        </li>
                        <li className={style.item}>
                            <Link className={style.link} to={getUrl("/account/chat")}>{t("Chat")}</Link>
                        </li>
                        <li className={style.item}>
                            <Link className={style.link} to={getUrl("/account/orders")}>{t("My Orders")}</Link>
                        </li>
                        <li className={style.item}>
                            <Link className={style.link} to={getUrl("/logout")}>{t("Logout")}</Link>
                        </li>
                    </ul>
                </nav>
            }
        </div>
    )
}

export default PopMenu