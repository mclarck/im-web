import React from "react";
import style from "./style.module.css";
import { useLocale } from "im-hooks";
import { MdRemoveShoppingCart } from "react-icons/md";

const NoCart = (props: any) => {
  const { t } = useLocale();
  return (
    <div className={style.NoCart}>
      <div className={style.content}>
        <div className={style.icon}>
          <MdRemoveShoppingCart />
        </div>
        <div className={style.message}>{t("Cart Empty")}</div>
      </div>
    </div>
  );
};
export default NoCart;
