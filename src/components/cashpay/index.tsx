import {Button} from "im-ui-core"
import React from "react"
import style from "./style.module.css"
import {useLocale} from "im-hooks";
import translations from "../../resources/translations";

const CashPay = (props: any) => {
    const {t, lang} = useLocale(translations)
    return (
        <div className={style.CashPay}>
            <div className={style.message}>{props.message||t("Pay on delivery")}</div>
            <address className={style.location}>{t("Deliver to")} {props.location}</address>
            <div className={style.submit}>
                <Button theme="dark" onClick={props.onClick}>{t("Continue")}</Button>
            </div>
        </div>
    )
}

export default CashPay