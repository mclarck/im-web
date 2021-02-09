import useCartModel from "../model/cart";
import useLink from "../services/useLink";
import {useLocale} from "im-hooks";
import translations from "../resources/translations";
import {useParams} from "react-router-dom";

const useAfterOrder = () => {
    const {locale} = useParams<any>()
    const {t, lang} = useLocale(translations, locale)
    const cart = useCartModel()
    const {goTo} = useLink()

    const keepShopping = () => {
        cart.clear()
        goTo("/stocks")
    }
    return {t,keepShopping}
}

export default useAfterOrder