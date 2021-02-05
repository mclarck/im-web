import useCartModel from "../model/cart";
import useLink from "../services/useLink";
import {useLocale} from "im-hooks";

const useAfterOrder = () => {
    const {t} = useLocale()
    const cart = useCartModel()
    const {goTo} = useLink()

    const keepShopping = () => {
        cart.clear()
        goTo("/stocks")
    }
    return {t,keepShopping}
}

export default useAfterOrder