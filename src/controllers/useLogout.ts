import {Store} from "../services/database";
import useLink from "../services/useLink";
import useCartModel from "../model/cart";

const useLogout = () => {
    const store = new Store()
    const {goTo} = useLink()
    const cart = useCartModel()

    store.clear();
    cart.clear()
    goTo("/stocks")
}

export default useLogout