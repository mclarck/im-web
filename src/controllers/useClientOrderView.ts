import {useCalculator, useLocale} from "im-hooks";
import _ from "lodash";
import {useState} from "react";
import translations from "../resources/translations";
import {useParams} from "react-router-dom";

const useClientOrderView = (cart: any[]) => {
    const {locale} = useParams<any>()
    const {t, lang} = useLocale(translations, locale)
    const {subTotal, shipment, amount} = useCalculator(_.map(cart, (o) => o.node))
    const [state] = useState<any>("preparing")
    const bills: any = [
        {name: t("Subtotal"), value: subTotal()},
        {name: t("Shipping"), value: shipment()},
        {name: t("Total"), value: amount(), istotal: true},
    ];
    const states = [
        {state: "preparing", label: t("Preparing")},
        {state: "shipping", label: t("On way")},
        {state: "Arrived", label: t("Arrived")},
    ]
    return {t, states, state, bills, subTotal, shipment, amount}
}

export default useClientOrderView