import {useCalculator, useLocale} from "im-hooks";
import _ from "lodash";
import translations from "../resources/translations";
import {useParams} from "react-router-dom";

const useClientOrderView = (cart: any[]) => {
    const {locale} = useParams<any>()
    const {t} = useLocale(translations, locale)
    const {subTotal, shipment, amount} = useCalculator(_.map(cart, (o) => o.node))
    const bills: any = [
        {name: t("Subtotal"), value: subTotal()},
        {name: t("Shipping"), value: shipment()},
        {name: t("Total"), value: amount(), istotal: true},
    ];

    return {t, bills, subTotal, shipment, amount}
}

export default useClientOrderView