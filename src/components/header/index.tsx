import React from "react";
import style from "./style.module.css";
import { SearchInput } from "im-ui-core";

const Header = (props: any) => {
  return (
    <div className={style.Header}>
      <div className={style.heading}>{props.children}</div>
      <div className={style.field}>
        <SearchInput onChange={props.onChange} />
      </div>
    </div>
  );
};

export default Header;
