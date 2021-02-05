import {gql} from '@apollo/client'
import {cart} from '../cache'

export const GET_CART_ITEMS = gql`
    query GetCartItems {
        items @client
    }
`
const useCartModel = () => {
    const read = () => cart()
    const add = (order: any) => {
        if (order?.quantity > 0) {
            const prev =  cart()
            const items = [...prev, order]
            cart(items)
        }
    }
    const remove = (order: any) => {
        const items = cart().filter((o: any) => o !== order)
        cart(items)
    }
    const clear = () => {
        cart([])
    }
    return {add, remove, clear, read}
}

export default useCartModel
