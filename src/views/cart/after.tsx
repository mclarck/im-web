import React from "react";
import style from "./style.module.css"
import {HiShieldCheck} from "react-icons/hi"
import {RiShoppingCart2Line} from "react-icons/ri"
import useAfterOrder from "../../controllers/useAfterOrder";


const AfterOrder = (props: any) => {
    const {keepShopping, t} = useAfterOrder()
    return (
        <div className={style.After}>
            <div className={style.content}>
                <div className={style.icon}><HiShieldCheck/></div>
                <div className={style.message}>{props.message}</div>
                <button className={style.link} onClick={keepShopping}>
                    <span className={style.icon}><RiShoppingCart2Line/></span>
                    <span>{t("Keep Shopping")}</span>
                </button>
            </div>
        </div>
    )
}
export default AfterOrder