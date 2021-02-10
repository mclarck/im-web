import React from "react";
import style from "./style.module.css";
import { useLocale } from "im-hooks";
import { MdRemoveShoppingCart } from "react-icons/md";
import translations from "../../resources/translations";
import {useParams} from "react-router-dom";

const NoCart = (props: any) => {
  const {locale} = useParams<any>()
  const {t} = useLocale(translations, locale)
  return (
    <div className={style.NoCart}>
      <div className={style.content}>
        <div className={style.icon}>
          <MdRemoveShoppingCart />
        </div>
        <div className={style.message}>{t("Empty Cart")}</div>
      </div>
    </div>
  );
};
export default NoCart;
