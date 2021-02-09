import React from "react";
import style from "./style.module.css";
import {SearchInput} from "im-ui-core";
import {useLocale} from "im-hooks";
import translations from "../../resources/translations";
import {useParams} from "react-router-dom";

const Header = (props: any) => {
    const {locale} = useParams<any>()
    const {t} = useLocale(translations, locale)
    return (
        <div className={style.Header}>
            <div className={style.heading}>{props.children}</div>
            <div className={style.field}>
                <SearchInput onChange={props.onChange} placeholder={t("Search")}/>
            </div>
        </div>
    );
};

export default Header;
