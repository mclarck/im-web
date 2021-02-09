import React from "react";
import style from "./style.module.css";
import useOrders from "../../controllers/useOrders";
import _ from "lodash";
import ClientOrderView from "../../components/clientOrderView";
import {BiCalendarEvent} from "react-icons/bi"

const Orders = (props: any) => {
    const {getDate, states, operations} = useOrders()
    return (
        <div className={style.Orders}>
            <div className={style.operations}>
                {_.map(operations, (o: any, idx) => {
                    const operation = o.node;
                    if (!["active", "shipping", "arrived", "canceled"].includes(operation.status)) return null
                    return (
                        <div key={idx} className={style.operation}>
                            <div className={style.date}>
                                <div className={style.icon}><BiCalendarEvent/></div>
                                <div className={style.calendar}>{getDate(operation?.created)}</div>
                            </div>
                            <div className={style.cart}>
                                <ClientOrderView states={states} state={operation?.status}
                                                 cart={operation?.orders?.edges}/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Orders;
