import React from "react";
import useRegister from "../../controllers/useRegister";
import style from "./style.module.css";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const AfterRegister = (props: any) => {
  const { t, link } = useRegister();
  return (
    <div className={style.After}>
      <div className={style.after}>
        <div className={style.icon}>
          <BsFillPersonCheckFill />
        </div>
        <div className={style.message}>{t("You have been registered!")}</div>
        <div className={style.link}>
          <Link to={link("/stocks")}>{t("Continue shopping!")}</Link>
        </div>
      </div>
    </div>
  );
};

export default AfterRegister;
