import _ from "lodash";
import React from "react";
import NoCart from "../../components/nocart";
import OrderView from "../../components/orderview";
import useCart from "../../controllers/useCart";
import Login from "../login";
import style from "./style.module.css";
import {Billing, Loader} from "im-ui-core";
import CashPay from "../../components/cashpay";
import AfterOrder from "./after";

const Cart = (props: any) => {
    const {
        cart,
        onLogged,
        t,
        send,
        orderSent,
        shortAddress,
        auth,
        loading,
        bills,
        remove,
        hasOrder,
        isAuth
    } = useCart();
    if (loading) {
        return <Loader/>
    } else if (!isAuth) {
        return <Login onLogged={onLogged}/>;
    } else if (!hasOrder) {
        return <NoCart/>;
    } else if (orderSent) {
        return <AfterOrder message={t("Order has been sent")}/>;
    } else {
        return (
            <div className={style.Cart}>
                <div className={style.content}>
                    <div className={style.cart}>
                        <div className={style.items}>
                            {_.map(cart, (order: any, idx) => {
                                return <OrderView key={idx} order={order} onRemove={remove}/>;
                            })}
                        </div>
                    </div>
                    <div className={style.billing}>
                        <div className={style.bill}>
                            <Billing bills={bills}/>
                        </div>
                        <div className={style.payment}>
                            <CashPay onClick={send} location={shortAddress(auth.address)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
export default Cart;
