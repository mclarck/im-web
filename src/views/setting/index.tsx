import React from "react"
import style from "./style.module.css"
import {Mapview} from "im-ui-core";
import useSetting from "../../controllers/useSetting";
import SettingForm from "../../components/settingForm";


const Setting = (props: any) => {
    const {bounds, address, location, setting, onMutate} = useSetting()
    return (
        <div className={style.Setting}>
            <div className={style.map}>
                {address && <Mapview address={{location: location}} bounds={bounds}/>}
            </div>
            <div className={style.form}>
                <SettingForm setting={setting} onMutate={onMutate}/>
            </div>
        </div>
    )
}

export default Setting