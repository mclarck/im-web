import React from 'react'
import _ from "lodash";
import style from "../../views/orders/style.module.css";
import OrderView from "../orderview";
import useClientOrderView from "../../controllers/useClientOrderView";
import {Billing, OrderState} from "im-ui-core";

const ClientOrderView = (props: any) => {
    const {bills, states, state} = useClientOrderView(props.cart)
    return (
        <React.Fragment>
            {_.map(props.cart, (order: any, index) => {
                return (
                    <div key={index} className={style.order}>
                        <OrderView order={order.node}/>
                    </div>
                )
            })}
            <div className={style.billing}>
                <Billing bills={bills}/>
            </div>
            <div className={style.status}>
                <OrderState states={states} active={state}/>
            </div>
        </React.Fragment>
    )
}

export default ClientOrderView