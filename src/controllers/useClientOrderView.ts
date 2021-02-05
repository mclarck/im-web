import {useCalculator, useLocale} from "im-hooks";
import _ from "lodash";
import {useState} from "react";

const useClientOrderView = (cart: any[]) => {
    const {t} = useLocale()
    const {subTotal, shipment, amount} = useCalculator(_.map(cart, (o) => o.node))
    const [state, setstate] = useState<any>("preparing")
    const bills: any = [
        {name: t("Subtotal"), value: subTotal()},
        {name: t("Shipping"), value: shipment()},
        {name: t("Total"), value: amount(), istotal: true},
    ];
    const states = [
        {state: "preparing", label: t("Preparing")},
        {state: "shipping", label: t("Shipping")},
        {state: "Arrived", label: t("Arrived")},
    ]
    return {t, states, state, bills, subTotal, shipment, amount}
}

export default useClientOrderView