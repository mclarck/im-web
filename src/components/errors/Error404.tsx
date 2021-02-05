import React from "react";
import style from "./style.module.css";

const Error404 = (props: any) => {
  return (
    <div className={style.Error404}>
      <div className={style.message}>{"PAGE NOT FOUND"}</div>
    </div>
  );
};
export default Error404;
