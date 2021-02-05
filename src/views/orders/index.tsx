import React from "react";
import style from "./style.module.css";
import useOrders from "../../controllers/useOrders";
import _ from "lodash";
import moment from "moment"
import ClientOrderView from "../../components/clientOrderView";
import {Loader} from "im-ui-core";

const Orders = (props: any) => {
    const {loading, lang, operations} = useOrders()
    return (
        <div className={style.Orders}>
            <div className={style.operations}>
                {_.map(operations, (o: any, idx) => {
                    const operation = o.node;
                    return (
                        <div key={idx} className={style.operation}>
                            <div className={style.date}>{moment(operation.created).locale(lang).calendar()}</div>
                            <div className={style.cart}>
                                <ClientOrderView cart={operation?.orders?.edges}/>
                            </div>
                        </div>
                    )
                })}
            </div>
            {loading && <Loader/>}
        </div>
    )
}
export default Orders;
