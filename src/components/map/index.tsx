import React from "react";
import {Mapview, Modal, Button} from "im-ui-core";
import {useLocale} from "im-hooks";
import style from "./style.module.css";
import translations from "../../resources/translations";
import {useParams} from "react-router-dom";

const Map = (props: any) => {
    const {locale} = useParams<any>();
    const {t} = useLocale(translations, locale);
    return (
        <Modal
            onClose={props.onClose}
            className={style.Map}
            dimension={{width: "70vw", height: "auto"}}
        >
            <Mapview address={props.address} bounds={props.bounds}/>
            <div className={style.field}>
                <div className={style.submit}>
                    <Button onClick={props.onConfirm}>{t("Confirm Address")}</Button>
                </div>
            </div>
        </Modal>
    );
};

export default Map;
