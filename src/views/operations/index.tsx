import React from "react";
import style from "./style.module.css";
import useOperations from "../../controllers/useOperations";
import _ from "lodash";
import OperationView from "../../components/operationView";
import {Loader} from "im-ui-core";


const Operations = (props: any) => {
    const {filter,setting, sales, loading} = useOperations(props)
    return (
        <div className={style.Operations}>
            <div className={style.items}>
                {_.map(filter(sales), (o: any, idx: number) => {
                    return (
                        <OperationView
                            key={idx}
                            cart={o.node}
                            socket={props.socket}
                            company={props.company}
                            setting={setting}
                        />
                    );
                })}
            </div>
            {loading && <Loader/>}
        </div>
    )
}

export default Operations