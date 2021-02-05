import React from "react";
import style from "./style.module.css";
import {SearchInput} from "im-ui-core";
import {useLocale} from "im-hooks";
import translations from "../../resources/translations";

const Header = (props: any) => {
    const {t} = useLocale(translations)
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
