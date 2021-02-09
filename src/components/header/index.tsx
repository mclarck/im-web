import React from "react";
import style from "./style.module.css";
import { IconButton, SearchInput } from "im-ui-core";
import { HiPencil } from "react-icons/hi";

const Index = (props: {
  title?: string;
  subtitle?: string;
  onClick?: (val?: string) => void;
  onChange?: (val: string) => void;
}) => {
  return (
    <div className={style.header}>
      <div className={style.title}>
        {props.title}
        <div className={style.subtitle}>{props.subtitle}</div>
      </div>
      <div className={style.field}>
        <SearchInput onChange={props.onChange} size="sm" />
        <IconButton size="sm" onClick={props.onClick}>
          <HiPencil />
        </IconButton>
      </div>
    </div>
  );
};

export default Index;
