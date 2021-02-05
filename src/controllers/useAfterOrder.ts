import useCartModel from "../model/cart";
import useLink from "../services/useLink";
import {useLocale} from "im-hooks";
import translations from "../resources/translations";

const useAfterOrder = () => {
    const {t} = useLocale(translations)
    const cart = useCartModel()
    const {goTo} = useLink()

    const keepShopping = () => {
        cart.clear()
        goTo("/stocks")
    }
    return {t,keepShopping}
}

export default useAfterOrder