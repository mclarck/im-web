import React from "react";
import { Mapview, Modal, Button } from "im-ui-core";
import { useLocale } from "im-hooks";
import style from "./style.module.css";

const Map = (props: any) => {
  const { t } = useLocale();
  return (
    <Modal
      onClose={props.onclose}
      className={style.Map}
      dimension={{ width: "70vw", height: "auto" }}
    >
      <Mapview address={props.address} bounds={props.bounds} />
      <div className={style.field}>
        <div className={style.submit}>
          <Button onClick={props.onconfirm}>{t("Confirm Address")}</Button>
        </div>
      </div>
    </Modal>
  );
};

export default Map;
