import React from "react";
import style from "./style.module.css";
import { useLocale } from "im-hooks";
import { MdRemoveShoppingCart } from "react-icons/md";
import translations from "../../resources/translations";

const NoCart = (props: any) => {
  const { t } = useLocale(translations);
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
